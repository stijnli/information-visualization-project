const renderMusicSelection = () => {
    const musicSelection = document.getElementById('musicSelection');

    if (musicSelection === null) {
        setTimeout(renderMusicSelection, 500);

        return;
    }

    // Clear the music selection
    musicSelection.innerHTML = '';

    // Render the music selection with d3 in bootstrap cards
    let div = d3.select('#musicSelection');

    if (selectedSongs.length === 0) {
        div.append('div')
            .attr('class', 'alert alert-warning')
            .attr('role', 'alert')
            .style('margin-top', '10px')
            .text('No songs selected');
    }

    // Create a small card for each song with Image on the left, and song details on the right. Song details include song name and artist below each other.
    div.selectAll('div').data(selectedSongs).enter().remove().append('div')
        .attr('class', 'card w-100')
        .style('margin-top', '10px')
        .style('margin-bottom', '10px')
        .style('padding', '10px')
        .style('border-radius', '10px')
        .style('background-color', '#f8f9fa')

        .html((d) => {
            return `
                <div class="row">
                    <div class="col-3">
                    <a href="${d.external_urls.spotify}" target="_blank"
                    onmouseover="setCurrentHoveredSongId('${d.id}')" onmouseout="setCurrentHoveredSongId(undefined)"
                    id="musicSelection-${d.id}Link"
                    >
                        <img src="${d.album.images[0].url}" class="card-img" alt="..." style="border: 8px solid ${d.color}"
                        id=musicSelection-${d.id}Image
                        >
                    </a>
                        </div>
                    <div class="col-7" style="padding:0px">
                        <h5 class="card-title
                        ">${d.name}</h5>
                        <p class="card-text">${d.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                    <div class="col-2" style="padding:0px">
                        <button type="button" class="btn btn-danger" data-toggle="modal" 
                        onclick="removeSong('${d.id}')" data-target="#exampleModal"
                        >
                        -
                        </button>
                </div>
            `;
        });


}

renderMusicSelection();


// Define render functions
const renderSearchResults = () => {

    const searchResultsDiv = document.getElementById('searchResults');

    if (searchResultsDiv === null) {
        setTimeout(renderSearchResults, 500);

        return;
    }

    // Clear the search results
    searchResultsDiv.innerHTML = '';

    if (currentSearchTerm === '') {
        searchResultsDiv.style.display = 'none';
        return;
    }

    searchResultsDiv.style.display = 'block';

    // Get the search results
    const searchResults = songs.filter(song => currentSearchTerm.split(" ").every(term => song.name.toLowerCase().includes(term.toLowerCase()) || song.artists.some(artist => artist.name.toLowerCase().includes(term.toLowerCase())))).slice(0, 10);

    let message = undefined;
    if (config.maxSelectedSongs <= selectedSongs.length) {
        message = 'You can only select up to 10 songs, please remove some songs before adding more.';
    }

    // Render the search results with d3 and bootstrap
    const div = d3.select('#searchResults');

    if (searchResults.length === 0 && message === undefined) {
        message = 'No songs found with the given search term';
    }

    if (message !== undefined) {
        div.append('div')
            .attr('class', 'alert alert-warning')
            .attr('role', 'alert')
            .text(message);

        return;
    }


    // Create a small card for each song with Image on the left, and song details on the right. Song details include song name and artist below each other.
    div.selectAll('div').data(searchResults).enter().remove().append('div')
        .attr('class', 'card w-100')
        .style('margin-top', '10px')
        .style('margin-bottom', '10px')
        .style('padding', '10px')
        .style('border-radius', '10px')
        .style('background-color', '#f8f9fa')

        .html((d) => {
            return `
                <div class="row">
                    <div class="col-3">
                    <a href="${d.external_urls.spotify}" target="_blank">
                        <img src="${d.album.images[0].url}" class="card-img" alt="...">
                    </a>
                        </div>
                    <div class="col-7" style="padding:0px">
                        <h5 class="card-title
                        ">${d.name}</h5>
                        <p class="card-text">${d.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                    <div class="col-2" style="padding:0px">
                        <button type="button" class="btn btn-success" data-toggle="modal"
                        onclick="addSong('${d.id}'); setCurrentSearchTerm('');" data-target="#exampleModal"
                        >
                        +
                        </button>
                </div>
            `;
        }
        );
};
