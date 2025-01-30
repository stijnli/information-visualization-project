// Define config variables
const config = {
    songColors: ['#a6cee3','#b2df8a','#fb9a99','#fdbf6f','#cab2d6','#33a02c','#1f78b4','#e31a1c','#ff7f00','#6a3d9a'],
    maxSelectedSongs: 10
}

// Define variables (all variables have a getter and setter function so that related functions can be called when the value is changed). 
// IMPORTANT: Never change the value of a variable directly, always use the setter function.

const colorQueue = [...config.songColors];

let selectedSongs = [];
const setSelectedSongs = (newSelectedSongs) => {
    // Make sure that is not possible for newSelectedSongs to contain more items than the maxSelectedSongs config variable
    if (newSelectedSongs.length > config.maxSelectedSongs) {
        newSelectedSongs = newSelectedSongs.slice(0, config.maxSelectedSongs);
    }


    // Check which songs have been removed and add their colors back to the queue
    const removedSongs = selectedSongs.filter(song => !newSelectedSongs.some(newSong => newSong.id === song.id));
    removedSongs.forEach(song => colorQueue.push(song.color));

    // Assign colors to the new songs
    const addedSongs = newSelectedSongs.filter(song => !selectedSongs.some(oldSong => oldSong.id === song.id));
    addedSongs.forEach(song => {
        song.color = colorQueue.pop();
    });
    if (addedSongs.length == 0 && removedSongs.length == 0) {
        return;
    }


    selectedSongs = newSelectedSongs;

    // Execute rerenders
    renderMusicSelection();
    if (graphChart !== undefined) {
        graphChart.updateVis();
    }
    updateRankChart();
    updateCountryDropdownMenu();
    renderHeatmap();
};

let graphChart = undefined;

let currentHoveredSongId = undefined;
let oldHoveredSongOutlineColor = undefined;
const setCurrentHoveredSongId = (newSongId) => {
    const oldSongIsSelected = selectedSongs.some(song => song.id === currentHoveredSongId);
    console.log(`Changing hovered song from ${currentHoveredSongId} to ${newSongId}`);
    if (currentHoveredSongId === newSongId) {
        return;
    }

    // Update the border of the song image
    if (currentHoveredSongId !== undefined) {
        if (oldSongIsSelected) {
            document.getElementById(`musicSelection-${currentHoveredSongId}Image`).style.border = `8px solid ${selectedSongs.find(song => song.id === currentHoveredSongId).color}`;
        }

        // Change svg node stroke
        const graphElement = document.getElementById("graphNode-" + currentHoveredSongId);
        if (graphElement !== null) {
            graphElement.style.stroke = oldHoveredSongOutlineColor
        }
        if (document.getElementById(`rankchart-${currentHoveredSongId}`) !== null) {
            document.querySelectorAll(`.pathLine:not(#rankchart-${currentHoveredSongId})`).forEach((elem) => elem.style.opacity = 1)
        }

        d3.select("#Row" + currentHoveredSongId + "highlight").style("visibility", "hidden"); // removes row higlighting
        d3.select("#song" + currentHoveredSongId + "inHeatmapScroll").remove();// removes the scrolling text
        
    }
    currentHoveredSongId = newSongId    
    
    if (newSongId === undefined) {

        return;
    }

    const songIsSelected = selectedSongs.some(song => song.id === newSongId);

    if (!songIsSelected) {
        
        return;
    }

    const selectedSong = selectedSongs.find(song => song.id === newSongId);

    if (newSongId !== undefined) {
        document.getElementById(`musicSelection-${newSongId}Image`).style.border = '8px solid #000000';
        if (document.getElementById(`rankchart-${newSongId}`) !== null) {
            document.querySelectorAll(`.pathLine:not(#rankchart-${newSongId})`).forEach((elem) => elem.style.opacity = 0.2)
        }
        // Change svg node stroke
        graphNode = document.getElementById("graphNode-" + newSongId)
        oldHoveredSongOutlineColor = graphNode.style.stroke
        graphNode.style.stroke = "black"

        
        // highlight the song in the attribute heatmap
        d3.select("#Row" + newSongId + "highlight").attr("stroke",selectedSong.color ).attr("stroke-width", 4).style("visibility", "visible");// change for row outline highlight


    }

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
                });


        })
        .catch(error => console.error('Error loading data:', error));

    d3.csv("data/measurements.csv", (d) => {
        return {
            spotify_id: d.spotify_id,
            snapshot_date: d3.timeParse("%Y-%m-%d")(d.snapshot_date),
            daily_rank: d.daily_rank,
            country: d.country,
        };
        })
        .then((data) => {
            setMeasurements(data);
            setIntialSongSelection();

            return fetch("data/alpha2ToCountryName.json");
        })
        .then((response) => response.json())
        .then((alpha2ToCountryCode) => {
            initCountryOptions(alpha2ToCountryCode); 
            updateCountryDropdownMenu();
        });

    function setIntialSongSelection() {
        if (selectedSongs.length > 0) {
            return true;
        }
        if (songs.length === 0 || measurements.length === 0) {
            setTimeout(() => {
                setIntialSongSelection();
            }, 1000);
        }
        const rankPerSong = new Map();
        measurements.forEach(measurement => {
            if (!rankPerSong.has(measurement.spotify_id)) {
                rankPerSong.set(measurement.spotify_id, 0);
            }
            rankPerSong.set(measurement.spotify_id, rankPerSong.get(measurement.spotify_id) + 51 - measurement.daily_rank)
        });
        const topSongs = [...rankPerSong.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50);

        // Sample 5 random song ids from the 5% top songs
        const sample = [];
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * topSongs.length);
            sample.push(topSongs[randomIndex][0]);
            topSongs.splice(randomIndex, 1);
        }
        setSelectedSongs(songs.filter(song => sample.includes(song.id)));
    }


    renderMusicSelection();
    initRankChart();
};


