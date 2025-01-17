// Define config variables
const config = {
    songColors: ["#00B7FF", "#004DFF", "#00FFFF", "#826400", "#580041", "#FF00FF", "#C500FF", "#FFCA00", "#969600", "#B4A2FF", "#C20078", "#0000C1", "#FF8B00",  "#FF0000", "#009E8F", "#D7A870", "#8200FF", "#960000", "#BBFF00", "#FFFF00", "#006F00"],
    maxSelectedSongs: 10
}

// Define variables (all variables have a getter and setter function so that related functions can be called when the value is changed). 
// IMPORTANT: Never change the value of a variable directly, always use the setter function.

const colorQueue = [...config.songColors];

let selectedSongs = [];
const setSelectedSongs = (newSelectedSongs) => {
    // Check which songs have been removed and add their colors back to the queue
    const removedSongs = selectedSongs.filter(song => !newSelectedSongs.some(newSong => newSong.id === song.id));
    removedSongs.forEach(song => colorQueue.push(song.color));

    // Assign colors to the new songs
    const addedSongs = newSelectedSongs.filter(song => !selectedSongs.some(oldSong => oldSong.id === song.id));
    addedSongs.forEach(song => {
        song.color = colorQueue.pop();
    });


    selectedSongs = newSelectedSongs;

    // Execute rerenders
    renderMusicSelection();
    graphChart.updateVis();
    updateRankChart();
    updateCountryDropdownMenu();
};

let currentHoveredSongId = undefined;
let oldHoveredSongOutlineColor = undefined;
const setCurrentHoveredSongId = (newSongId) => {
    const oldSongIsSelected = selectedSongs.some(song => song.id === currentHoveredSongId);
    // Update the border of the song image
    if (currentHoveredSongId !== undefined && currentHoveredSongId !== newSongId) {
        if (oldSongIsSelected) {
            document.getElementById(`musicSelection-${currentHoveredSongId}Image`).style.border = `8px solid ${selectedSongs.find(song => song.id === currentHoveredSongId).color}`;
        }

        // Change svg node stroke
        document.getElementById("graphNode-" + currentHoveredSongId).style.stroke = oldHoveredSongOutlineColor
        if (document.getElementById(`rankchart-${currentHoveredSongId}`) !== null) {
            document.getElementById(`rankchart-${currentHoveredSongId}`).style.opacity = 0.6;
        }
    }

    if (newSongId === undefined) {
        return;
    }

    const songIsSelected = selectedSongs.some(song => song.id === newSongId);

    if (!songIsSelected) {
        return;
    }

    if (newSongId !== undefined) {
        document.getElementById(`musicSelection-${newSongId}Image`).style.border = '8px solid #000000';
        if (document.getElementById(`rankchart-${newSongId}`) !== null) {
            document.getElementById(`rankchart-${newSongId}`).style.opacity = 1;
        }
        // Change svg node stroke
        graphNode = document.getElementById("graphNode-" + newSongId)
        oldHoveredSongOutlineColor = graphNode.style.stroke
        graphNode.style.stroke = "black"

    }

    currentHoveredSongId = newSongId
}


let currentSearchTerm = '';
const setCurrentSearchTerm = (searchTerm) => {
    currentSearchTerm = searchTerm;
    renderSearchResults();
    document.getElementById('searchTerm').value = searchTerm;
};

let songs = [];
const setSongs = (songsData) => {
    songs = songsData;
};

let artists = [];
const setArtists = (artistsData) => {
    artists = artistsData;
};

let albums = [];
const setAlbums = (albumsData) => {
    albums = albumsData;
};


// Define some commonly used state-mutation functions (functions that use the setter functions to change the state)
const removeSong = (songId) => {
    // Remove the song from the selection
    const newSelection = selectedSongs.filter(song => song.id !== songId);
    setSelectedSongs(newSelection);
};

const addSong = (songId) => {
    if (selectedSongs.some(song => song.id === songId)) {
        return;
    }

    // Add the song to the selection
    const newSong = songs.find(song => song.id === songId);
    setSelectedSongs([...selectedSongs, newSong]);
};

const getSongColor = (id) => {
    return selectedSongs.find(song => song.id === id)?.color;
}

const initializeLoad = () => {
    // Define data loading, try not to load the data multiple times.
    fetch('data/songs.json')
        .then(response => response.json())
        .then(songs => {
            setSongs(songs);

            let albumsMap = new Map();
            songs.forEach(song => {
                if (!albumsMap.has(song.album.id)) {
                    albumsMap.set(song.album.id, song.album);
                }
                albumsMap.get(song.album.id).songs = albumsMap.get(song.album.id).songs || new Set();
                albumsMap.get(song.album.id).songs.add(song);
            });
            albums = [...albumsMap.values()];

        })
        .then(() => {
            fetch('data/artists.json')
                .then(response => response.json())
                .then(artists => {
                    songsPerArtist = new Map();
                    albumsPerArtist = new Map();
                    const allAlbums = new Map();
                    songs.forEach(song => {
                        if (!allAlbums.has(song.album.id)) {
                            allAlbums.set(song.album.id, song.album);
                        }
                        song.artists.forEach(artist => {
                            if (!songsPerArtist.has(artist.id)) {
                                songsPerArtist.set(artist.id, new Set());
                            }
                            songsPerArtist.get(artist.id).add(song);
                        });

                        song.album.artists.forEach(artist => {
                            if (!albumsPerArtist.has(artist.id)) {
                                albumsPerArtist.set(artist.id, new Set());
                            }
                            albumsPerArtist.get(artist.id).add(song.album);
                        });


                    });
                    artists.forEach(artist => {
                        artist.songs = [...songsPerArtist.get(artist.id) || new Set()];
                        artist.albums = [...albumsPerArtist.get(artist.id) || new Set()];
                    });
                    const albums = [...allAlbums.values()];
                    setArtists(artists);
                    graphChart = new GraphChart(songs, artists, albums, selectedSongs);
                    graphChart.initVis();
                    setSelectedSongs(songs.sort(() => 0.5 - Math.random()).slice(0, 5));
                });


        })
        .catch(error => console.error('Error loading data:', error));

    d3.csv("data/measurements_full.csv", (d) => {
        return {
            spotify_id: d.spotify_id,
            snapshot_date: d3.timeParse("%Y-%m-%d")(d.snapshot_date),
            daily_rank: d.daily_rank,
            country: d.country,
        };
    })
    .then((data) => {
        setMeasurements(data);
        return fetch("data/alpha2ToCountryName.json");
    })
    .then((response) => response.json())
    .then((alpha2ToCountryCode) => initCountryOptions(alpha2ToCountryCode));

    renderMusicSelection();
    initRankChart();
};


