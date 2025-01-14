class GraphChart {
    constructor(songs, artists, albums) {
        this.songs = songs;
        this.artists = artists;
        this.albums = albums;
        this.openedNodes = [];
        this.oldNodes = [];
        this.width = 1200;
        this.height = 400;
        this.legendWidth = 100;
        this.element = d3.select('#graphChart');
    }

    initVis() {
        this.svg = this.element.append('svg')
            .style('border', '1px solid #000')
            .attr('width', this.width + this.legendWidth)
            .attr('height', this.height);

        this.g = this.svg.append('g');

        this.zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                this.g.attr('transform', event.transform);
            });

        this.svg.call(this.zoom);

        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.id).strength(0.25))
            .force("charge", d3.forceManyBody().strength(-40))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2).strength(0.05))
            .force("x", d3.forceX(this.width / 2).strength(0.05))
            .force("y", d3.forceY(this.height / 2).strength(0.05))
            .force("collide", d3.forceCollide(10).strength(0.5))

        this.updateVis();

        this.addLegend();
    }

    wrangleData() {
        const artistIdToArtist = new Map(this.artists.map(artist => [artist.id, artist]));
        let nodes = [];

        selectedSongs.forEach(song => {
            nodes.push({ id: song.id, type: 'song', name: song.name, color: song.color });
        });

        // For each node in the opened nodes, add the node and the surrounding nodes
        this.openedNodes.forEach(node => {
            nodes.push({ ...node, color: selectedSongs.find(song => song.id === node.id)?.color });
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

        nodes = nodes.filter((node, index, self) =>
            index === self.findIndex(t => (
                t.id === node.id && t.type === node.type
            ))
        );

        let links = [];
        nodes.forEach(node => {
            if (node.type === 'song') {
                const song = this.songs.find(song => song.id === node.id);
                const albumInNodes = nodes.some(node => node.id === song.album.id);
                const albumOpened = this.openedNodes.some(node => node.id === song.album.id);
                const songOpened = this.openedNodes.some(node => node.id === song.id);

                if (albumInNodes && (albumOpened || songOpened)) {
                    links.push({ source: node.id, target: song.album.id });
                }

                song.artists.forEach(artist => {
                    const artistInNodes = nodes.some(node => node.id === artist.id);
                    const artistInAlbum = song.album.artists.some(albumArtist => albumArtist.id === artist.id);

                    const artistOpened = this.openedNodes.some(node => node.id === artist.id);

                    if (!artistInNodes || (!artistOpened && !songOpened)) {
                        return
                    }

                    if (!albumInNodes || !artistInAlbum || (!albumOpened && !artistOpened)) {
                        links.push({ source: node.id, target: artist.id });
                    } else if (albumInNodes && artistInAlbum) {
                        links.push({ source: node.id, target: song.album.id });
                    }
                });

            } else if (node.type === 'artist') {
                const artist = artistIdToArtist.get(node.id);
                const artistOpened = this.openedNodes.some(node => node.id === artist.id);

                artist.albums.forEach(album => {
                    const albumOpened = this.openedNodes.some(node => node.id === album.id);
                    if (albumOpened || artistOpened) {
                        links.push({ source: node.id, target: album.id });
                    }
                });

                artist.genres.forEach(genre => {
                    const genreOpened = this.openedNodes.some(node => node.id === genre);

                    if (genreOpened || artistOpened) {
                        links.push({ source: node.id, target: genre });
                    }
                });
            }
        });

        links.sort((a, b) => a.source - b.source || a.target - b.target);
        links = links.filter((link, index, self) =>
            index === self.findIndex(t => (
                t.source === link.source && t.target === link.target
            ))
        );


        // Update nodes with locations of the old nodes, try placing new nodes near old nodes so that the graph doesn't jump around
        nodes = nodes.map(node => {
            const oldNode = this.oldNodes.find(oldNode => oldNode.id === node.id);
            if (oldNode) {
                return { ...node, x: oldNode.x, y: oldNode.y };
            }
            let linkNearby = links.find(link => (link.source === node.id || link.target === node.id) && this.oldNodes.some((oldNode => (oldNode.id === link.source || oldNode.id === link.target) && (oldNode.x && oldNode.y))));

            const nodeNearby = linkNearby ? this.oldNodes.find(oldNode => oldNode.id === (linkNearby.source === node.id ? linkNearby.target : linkNearby.source)) : undefined;

            if (nodeNearby) {
                console.log(nodeNearby);
                return { ...node, x: nodeNearby.x + Math.random() * 50 - 25, y: nodeNearby.y + Math.random() * 50 - 25 };
            }
            else {
                return { ...node, x: this.width / 2, y: this.height / 2 };
            }
        });

        this.oldNodes = nodes;
        return { nodes, links };
    }

    updateVis() {
        const data = this.wrangleData();

        this.g.selectAll("path").remove();
        this.g.selectAll("line").remove();

        let link = this.g.selectAll("line");
        let node = this.g.selectAll("path");

        let localNode = node.data(data.nodes);
        localNode = localNode.enter().append("path")
            .attr("d", d => {
                const nodeOpen = this.openedNodes.some(node => node.id === d.id);
                const nodeSize = nodeOpen ? 500 : 200;

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
            .attr("id", d => "graphNode-" + d.id)
            .attr("fill", d => d.color || 'black')
            .attr("stroke", d => this.openedNodes.some(node => node.id === d.id) ? '#cccccc' : (d.edge || "white"))
            .attr("stroke-width", 2)
            .on("click", (event, d) => {
                event.stopPropagation();
                if (this.openedNodes.some(node => node.id === d.id)) {
                    this.openedNodes = this.openedNodes.filter(node => node.id !== d.id);
                }
                else {
                    this.openedNodes.push(d);
                }
                this.updateVis();

            })
            .on("contextmenu", (event, d) => {
                event.preventDefault();
                if (d.type === 'song') {
                    const selectedSong = selectedSongs.find(song => song.id === d.id);
                    if (selectedSong) {
                        setSelectedSongs(selectedSongs.filter(song => song.id !== d.id));
                    } else {
                        setSelectedSongs([...selectedSongs, this.songs.find(song => song.id === d.id)]);
                    }
                }
            })
            .on("mouseover", (event, d) => {
                if (d.type === 'song') {
                    setCurrentHoveredSongId(d.id);
                }
                d3.select(event.target).style("cursor", "pointer");
            })
            .on("mouseout", (event, d) => {
                setCurrentHoveredSongId(undefined);
                d3.select(event.target).style("cursor", "default");
            })
            .merge(localNode);


        localNode.append("title")
            .text(d => (d.type.charAt(0).toUpperCase() + d.type.slice(1) + ': ' + d.name));

        let localLink = link.data(data.links);
        localLink.exit().remove();
        localLink = localLink.enter().append("line")
            .attr("stroke-width", 1)
            .attr("stroke", "#000")
            .attr("opacity", 0.6)
            .lower()
            .merge(localLink);

        const ticked = () => {
            this.g.selectAll("line")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            this.g.selectAll("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            this.g.selectAll("path")
                .attr("transform", d => `translate(${d.x},${d.y})`);
        }

        this.simulation.nodes(data.nodes)
            .on("tick", ticked)


        this.simulation.force("link")
            .links(data.links);

        this.simulation.velocityDecay(0.2).alpha(1).restart();

    }

    addLegend() {
        const legend = this.svg.append('g')
            .attr('transform', `translate(${this.width + 20}, 20)`);

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
}
