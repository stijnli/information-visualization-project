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
    renderRankChart();
};

let currentHoveredSongId = undefined;
const setCurrentHoveredSongId = (newSongId) => {

    // Update the border of the song image
    if (currentHoveredSongId !== undefined && currentHoveredSongId !== newSongId) {
        document.getElementById(`musicSelection-${currentHoveredSongId}Image`).style.border = `8px solid ${selectedSongs.find(song => song.id === currentHoveredSongId).color}`;
        document.getElementById(`rankchart-'${currentHoveredSongId}'`).style.opacity = 0.5;
    }

    if (newSongId !== undefined) {
        document.getElementById(`musicSelection-${newSongId}Image`).style.border = '8px solid #000000';
        document.getElementById(`rankchart-'${newSongId}'`).style.opacity = 1;
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

// Define data loading, try not to load the data multiple times.
fetch('data/songs.json')
    .then(response => response.json())
    .then(songs => {
        setSelectedSongs(songs.sort(() => 0.5 - Math.random()).slice(0, 10));
        setSongs(songs);

    })
    .catch(error => console.error('Error loading songs:', error));




