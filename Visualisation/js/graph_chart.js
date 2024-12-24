let openedNodes = [];

const setOpenedNodes = (newOpenedNodes) => {
    openedNodes = newOpenedNodes;
    renderGraphChart();
}

// the graphChart is a network graph of the songs, artists, albums and genres. 
const renderGraphChart = () => {
    const height = 400;
    const width = 1200;
    const legendWidth = 100; // Width for the legend

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
        // Make svg with border
        svg = element.append('svg')
            .style('border', '1px solid #000')
            .attr('width', width + legendWidth) // Adjust width to accommodate legend
            .attr('height', height);
    }

    svg.html(''); // Clear previous content

    const g = svg.append('g'); // Create a group element

    const zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    // Preserve the zoom state
    const zoomState = svg.property("__zoom") || d3.zoomIdentity;
    svg.call(zoom).call(zoom.transform, zoomState);

    svg.call(zoom);

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).strength(0.5)) // Reduce link strength
        .force("charge", d3.forceManyBody().strength(-100)) // Reduce charge strength
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.5))
        .force("x", d3.forceX(width / 2).strength(0.05)) // Reduce x force strength
        .force("y", d3.forceY(height / 2).strength(0.05)); // Reduce y force strength

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

    // Only keep the first occurance of each node 
    nodes = nodes.filter((node, index, self) =>
        index === self.findIndex(t => (
            t.id === node.id && t.type === node.type
        ))
    );

    let links = [];
    nodes.forEach(node => {
        if (node.type === 'song') {
            const song = songs.find(song => song.id === node.id);
            const albumInNodes = nodes.some(node => node.id === song.album.id);
            const albumOpened = openedNodes.some(node => node.id === song.album.id);
            const songOpened = openedNodes.some(node => node.id === song.id);

            if (albumInNodes && (albumOpened || songOpened)) {
                links.push({ source: node.id, target: song.album.id });
            }

            song.artists.forEach(artist => {
                const artistInNodes = nodes.some(node => node.id === artist.id);
                const artistInAlbum = song.album.artists.some(albumArtist => albumArtist.id === artist.id);

                const artistOpened = openedNodes.some(node => node.id === artist.id);

                if (!artistInNodes || (!artistOpened && !songOpened)) {
                    return
                }

                // Show the artist-song link only if 1) album is not visible or 2) artist is not in the album (i.e. artist only contributed to the song) or 3) album or arist are not opened, as it would make a redundant link. 
                if (!albumInNodes || !artistInAlbum || (!albumOpened && !artistOpened) ) {
                    links.push({ source: node.id, target: artist.id });
                }
                // Else make sure that there is a link between the song and the album, so that the artist will be related to the song through the album.
                else if (albumInNodes && artistInAlbum) {
                    links.push({ source: node.id, target: song.album.id });
                }
            });

        } else if (node.type === 'artist') {
            const artist = artistIdToArtist.get(node.id);
            const artistOpened = openedNodes.some(node => node.id === artist.id);

            artist.albums.forEach(album => {
                const albumOpened = openedNodes.some(node => node.id === album.id);
                if (albumOpened || artistOpened) {
                    links.push({ source: node.id, target: album.id });
                }
            });

            artist.genres.forEach(genre => {
                const genreOpened = openedNodes.some(node => node.id === genre);

                // Only connect genres to artists if the genre is opened or the artist is opened, otherways it would many links for artists and genres.
                if (genreOpened || artistOpened) {
                    links.push({ source: node.id, target: genre });
                }
            });
        } else if (node.type === 'album') {
            // Albums are already linked to songs and artists by the song links
        } else if (node.type === 'genre') {
            // Genres are already linked to artists by the artist links.
        }
    });

    // Remove duplicates links by 1) sorting the links so that the source is always smaller than the target and 2) only keeping the first occurance of each link
    links.sort((a, b) => a.source - b.source || a.target - b.target);
    links = links.filter((link, index, self) =>
        index === self.findIndex(t => (
            t.source === link.source && t.target === link.target
        ))
    );

    // Update function that updates the graph with the new data, and handles the click events for the nodes
    const update = (data) => {
        let link = g.selectAll("line");
        let node = g.selectAll("circle");
        
        // Create nodes
        let localNode = node.data(data.nodes);
        localNode.exit().remove();
        localNode = localNode.enter().append("path")
            .attr("d", d => {
                // Set node size and shape based on the type of the node
                const nodeOpen = openedNodes.some(node => node.id === d.id);
                // Set node size based on whether the node is opened or not
                const nodeSize = nodeOpen ? 500 : 200;
                
                // Set node shape based on the type of the node
                if (d.type === 'song') {
                    return d3.symbol().type(d3.symbolCircle).size(nodeSize)();
                } else if (d.type === 'album') {
                    return d3.symbol().type(d3.symbolSquare).size(nodeSize)();
                } else if (d.type === 'artist') {
                    return d3.symbol().type(d3.symbolStar).size(nodeSize)();
                } else if (d.type === 'genre') {
                    return d3.symbol().type(d3.symbolTriangle).size(nodeSize)();
                }
            })
            // Set node id based on the node id, this is used so that the node appearance can be altered from code outside of the d3 code
            .attr("id", d => "graphNode-" + d.id)
            // Give it a fill color based on the color of the song, or black if no color is set
            .attr("fill", d => d.color || 'black')
            // Give it a border that is white (invisible) if the node is not opened, and grey if it is opened
            .attr("stroke", d => openedNodes.some(node => node.id === d.id) ? '#cccccc' : (d.edge || "white")) 
            .attr("stroke-width", 2)

            // Handle click on nodes to open or close them
            .on("click", (event, d) => {
                event.stopPropagation();
                if (openedNodes.some(node => node.id === d.id)) {
                    setOpenedNodes(openedNodes.filter(node => node.id !== d.id));
                } else {
                    setOpenedNodes([...openedNodes, d]);
                }
            })

            // Handle right click on nodes to add them to the selection
            .on("contextmenu", (event, d) => {
                event.preventDefault();
                if (d.type === 'song') {
                    const selectedSong = selectedSongs.find(song => song.id === d.id);
                    if (selectedSong) {
                        setSelectedSongs(selectedSongs.filter(song => song.id !== d.id));
                    } else {
                        setSelectedSongs([...selectedSongs, songs.find(song => song.id === d.id)]);
                    }

                }
            })

            // Handle mouseover and mouseout events to set the hovered song id, which highlights the song in the song list
            .on("mouseover", (event, d) => {
                // Set setCurrentHoveredSongId

                if (d.type === 'song') {
                    setCurrentHoveredSongId(d.id);
                }

                // Set cursor to pointer
                d3.select(event.target).style("cursor", "pointer");
            }
            )
            .on("mouseout", (event, d) => {
                // Set setCurrentHoveredSongId
                setCurrentHoveredSongId(undefined);

                // Set cursor to default
                d3.select(event.target).style("cursor", "default");
            }
            )
            .merge(localNode);

        // Add title to the nodes, which appears when hovering over the node
        localNode.append("title")
            .text(d => (d.type.charAt(0).toUpperCase() + d.type.slice(1) + ': ' + d.name));
        
        // Create links, which are the lines between the nodes, these are mapped to the data.links
        const ticked = () => {
            g.selectAll("line")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            g.selectAll("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            g.selectAll("path")
                .attr("transform", d => `translate(${d.x},${d.y})`);
        }

        simulation.nodes(data.nodes)
            .on("tick", ticked)
            .alpha(0.5) // Start with a lower alpha value to reduce initial movement


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

    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(${width + 20}, 20)`); // Position legend on the right side

    const legendData = [
        { type: 'song', shape: d3.symbolCircle, label: 'Song' },
        { type: 'album', shape: d3.symbolSquare, label: 'Album' },
        { type: 'artist', shape: d3.symbolStar, label: 'Artist' },
        { type: 'genre', shape: d3.symbolTriangle, label: 'Genre' }
    ];

    legend.selectAll('path')
        .data(legendData)
        .enter()
        .append('path')
        .attr('d', d => d3.symbol().type(d.shape).size(200)())
        .attr('transform', (d, i) => `translate(10, ${i * 30})`)
        .attr('fill', 'black');

    legend.selectAll('text')
        .data(legendData)
        .enter()
        .append('text')
        .attr('x', 30)
        .attr('y', (d, i) => i * 30 + 5)
        .text(d => d.label)
        .attr('alignment-baseline', 'middle');
}
