let openedNodes = [];

const setOpenedNodes = (newOpenedNodes) => {
    openedNodes = newOpenedNodes;
    renderGraphChart();
}

// the graphChart is a network graph of the songs, artists, albums and genres. 
const renderGraphChart = () => {
    const height = 400;
    const width = 1000;

    const element = d3.select('#graphChart');

    let message = undefined;
    if (songs.length === 0 || artists.length === 0) {
        message = 'Loading songs...'
        setTimeout(renderGraphChart, 500);
    }

    if (openedNodes.length === 0 && selectedSongs.length === 0) {
        message = 'Please select some songs to compare';
    }

    // Handle message
    if (message !== undefined) {
        element.html('');
        element.append('div')
            .attr('class', 'alert alert-warning')
            .attr('role', 'alert')
            .text(message);

        return;
    }

    let svg = element.select('svg');
    if (svg.empty()) {
        element.html('');
        svg = element.append('svg')
            .attr('width', width)
            .attr('height', height);
    }

    svg.html(''); // Clear previous content

    const g = svg.append('g'); // Create a group element

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.1))
        .force("y", d3.forceY(height / 2).strength(0.1));

    const artistIdToArtist = new Map(artists.map(artist => [artist.id, artist]));

    let nodes = [];
    selectedSongs.forEach(song => {
        nodes.push({ id: song.id, type: 'song', name: song.name, color: song.color });
    });
    // For each node in the opened nodes, add the node and the surrounding nodes
    openedNodes.forEach(node => {
        nodes.push(node);
        if (node.type === 'song') {
            const song = songs.find(song => song.id === node.id);
            song.artists.forEach(artist => {
                const fullArtist = artistIdToArtist.get(artist.id);
                nodes.push({ id: artist.id, type: 'artist', name: fullArtist.name });
            });
            nodes.push({ id: song.album.id, type: 'album', name: song.album.name });
        } else if (node.type === 'artist') {
            const artist = artistIdToArtist.get(node.id);
            artist.albums.forEach(album => {
                nodes.push({ id: album.id, type: 'album', name: album.name });
            });
            artist.genres.forEach(genre => {
                nodes.push({ id: genre, type: 'genre', name: genre });
            });
        } else if (node.type === 'album') {
            const album = albums.find(album => album.id === node.id);
            album.artists.forEach(artist => {
                const fullArtist = artistIdToArtist.get(artist.id);
                nodes.push({ id: artist.id, type: 'artist', name: fullArtist.name });
            });
            album.songs.forEach(song => {
                nodes.push({ id: song.id, type: 'song', name: song.name });
            });
        } else if (node.type === 'genre') {
            const genre = node.id;
            artists.forEach(artist => {
                if (artist.genres.includes(genre)) {
                    nodes.push({ id: artist.id, type: 'artist', name: artist.name });
                }
            });
        }
    });

    nodes = [...new Map(nodes.map(node => [node.id, node])).values()];

    const links = [];
    openedNodes.forEach(node => {
        if (node.type === 'song') {
            const song = songs.find(song => song.id === node.id);
            const albumOpen = openedNodes.some(node => node.id === song.album.id);
            song.artists.forEach(artist => {
                const artistInAlbum = song.album.artists.some(albumArtist => albumArtist.id === artist.id);
                if (!albumOpen || !artistInAlbum) {
                    links.push({ source: node.id, target: artist.id });
                } else if (albumOpen && artistInAlbum) {
                    links.push({ source: node.id, target: song.album.id });
                }
            });
            links.push({ source: node.id, target: song.album.id });
        } else if (node.type === 'artist') {
            const artist = artistIdToArtist.get(node.id);
            artist.albums.forEach(album => {
                links.push({ source: node.id, target: album.id });
            });
            artist.genres.forEach(genre => {
                links.push({ source: node.id, target: genre });
            });
        } else if (node.type === 'album') {
            const album = albums.find(album => album.id === node.id);
            album.artists.forEach(artist => {
                links.push({ source: node.id, target: artist.id });
            });
            album.songs.forEach(song => {
                links.push({ source: node.id, target: song.id });
            });
        } else if (node.type === 'genre') {
            const genre = node.id;
            artists.forEach(artist => {
                if (artist.genres.includes(genre)) {
                    links.push({ source: node.id, target: artist.id });
                }
            });
        }
    });

    const update = (data) => {
        let link = g.selectAll("line");
        let node = g.selectAll("circle");

        let localNode = node.data(data.nodes);
        localNode.exit().remove();
        localNode = localNode.enter().append("circle")
            .attr("r", 8)
            .attr("fill", d => d.color || 'black')
            .attr("stroke", d => d.edge || "white")
            .on("click", (event, d) => {
                event.stopPropagation();
                if (openedNodes.some(node => node.id === d.id)) {
                    setOpenedNodes(openedNodes.filter(node => node.id !== d.id));
                } else {
                    setOpenedNodes([...openedNodes, d]);
                }
            })
            .merge(localNode);

        localNode.append("title")
            .text(d => (d.type.charAt(0).toUpperCase() + d.type.slice(1) + ': ' + d.name));

        const ticked = () => {
            g.selectAll("line")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            g.selectAll("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

        simulation.nodes(data.nodes)
            .on("tick", ticked);

        let localLink = link.data(data.links);
        localLink.exit().remove();
        localLink = localLink.enter().append("line")
            .attr("stroke-width", 1)
            .attr("stroke", "#000")
            .attr("opacity", 0.6) // Make the lines slightly transparent
            .lower() // Move the lines to the back
            .merge(localLink);

        simulation.force("link")
            .links(data.links);
    }

    update({ nodes, links });
}
