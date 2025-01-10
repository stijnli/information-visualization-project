// Define config variables
const config = {
    songColors: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
    maxSelectedSongs: 10
}

// Define variables (all variables have a getter and setter function so that related functions can be called when the value is changed). 
// IMPORTANT: Never change the value of a variable directly, always use the setter function.

let selectedSongs = [];
const setSelectedSongs = (newSelectedSongs) => {
    // Reassign colors
    newSelectedSongs.forEach((song, index) => {
        song.color = config.songColors[index % config.songColors.length];
    }
    );

    selectedSongs = newSelectedSongs;

    // Execute rerenders
    renderMusicSelection();
    graphChart.updateVis();
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


let graphChart = undefined;
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

        }).then(() => {
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



    renderMusicSelection();
};


