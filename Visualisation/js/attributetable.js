// data is a subset of the orignal data used during the builiding process
// inputs is the variable where to test the different legths of the dataset

/// --- prepDataTable takes the raw data and prepares in an array; 
// the index of each element in tempRow is used in the objects of "attributes" as "arrayIndex" 
function prepDataTable(data) {
    let Rows = [];
    let tempRow = [];
    for (let i = 0; i < data.length; i++) {
        tempRow = [data[i].id,
        data[i].name,
        data[i].artists.map(artist => artist.name).join(', '),
        data[i].danceability,
        data[i].energy,
        data[i].acousticness,
        data[i].speechiness,
        data[i].liveness,
        data[i].tempo,
        data[i].valence,
        data[i].loudness,
        data[i].color];
        Rows.push(tempRow);
        console.log(Rows[i]);
    }
    return Rows;
}

function sortTable(data, keyToAttribute, sortDirection){
  data.sort((a, b) => {
        if (typeof a[keyToAttribute] === "string") {
            // Compare strings
            if (sortDirection === "asc") {
                return a[keyToAttribute].localeCompare(b[keyToAttribute]);
            } else {
                return b[keyToAttribute].localeCompare(a[keyToAttribute]);
            }
        } else {
            // Compare numbers
            if (sortDirection === "asc") {
                return a[keyToAttribute] - b[keyToAttribute];
            } else {
                return b[keyToAttribute] - a[keyToAttribute];
            }
        }
    });
    return data;
}

// croping the song title to fit in the element
function cropText(textElement, text, widthElement) {
    // Append a temporary text element to the SVG to measure its length
    const tempText = textElement.append("text")
        .attr("visibility", "hidden")
        .text(text);

    let croppedText = text;
    if (tempText.node().getComputedTextLength() < widthElement - 2) {
        croppedText = text
    }
    else {
        while (tempText.node().getComputedTextLength() > widthElement - 5) {
            croppedText = croppedText.slice(0, -4); 
            tempText.text(croppedText + "...");
        }
        croppedText = croppedText + "..."
    }
    // Remove the temporary element after measuring
    tempText.remove();

    return croppedText;
}
function renderLengthSong(svgObject, songTitle, songArtists){
    const tempTitle = svgObject.append("text")
        .attr("visibility", "hidden")
        .text(songTitle);
    const tempArtists = svgObject.append("text")
        .attr("visibility", "hidden")
        .text(songArtists);
    let renderLength
    if (tempTitle.node().getComputedTextLength() < tempArtists.node().getComputedTextLength()) {
        renderLength = tempArtists.node().getComputedTextLength()
    }
    else {
        renderLength = tempTitle.node().getComputedTextLength()
    }
    // Remove the temporary element after measuring
    tempTitle.remove();
    tempArtists.remove();
    return renderLength;
}


function makeScrolingSongTitle(svgObject, data, widthScroling, i) {
    let textElement = svgObject.append("g")
        .attr("clip-path", "url(#clip-border" + i + ")")
        .append("text")
        .attr("id", "song" + i + "inTableScroll")
        .attr("class", "scroll-container scroll-content")
        .attr("x", 5)
        .attr("y", heightElement + heightElement * i + heightElement / 4)
        .attr("dominant-baseline", "central")
        .on("mouseover", function () {
            d3.select("#song" + i + "inTable").style("visibility", "hidden");
        });

    textElement.append("tspan")
        .attr("class", "card-title")
        .attr("dy", "0")
        .text(data[i][1])
        .style("pointer-events", "none");

    textElement.append("tspan")
        .attr("class", "card-text")
        .attr("x", 5)
        .attr("dy", "1.2em")
        .text(data[i][2])
        .style("pointer-events", "none");

    // scrolling effect
    textElement.append("animateTransform")
        .attr("attributeName", "transform")
        .attr("type", "translate")
        .attr("from", widthScroling)   // Starting position (right)
        .attr("to", -renderLengthSong(svgObject, data[i][1], data[i][2]))    // Ending position (left)
        .attr("dur", renderLengthSong(svgObject, data[i][1], data[i][2] + widthScroling) /25 + "s")
        .attr("repeatCount", "indefinite"); // Infinite scrolling
}

function renderTableOutline(tableData, data, attributes) {
    let svgTable = d3.select("#attributeTable")
    svgTable.selectAll("*").remove();
    svgTable = svgTable.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // appending an outline for the whole table
    svgTable.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", heightElement*(data.length + 1))
        .attr("fill", "none")
        .attr("stroke", "black")
    // appending the headline of the table
    svgTable.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", widthSong)
        .attr("height", heightElement)
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("stroke", "black")
    svgTable.append("text")
        .style("text-anchor", "middle")
        .text("Song")
        .attr("class", "tableHeadline")
        .attr("id", "songnameHeadline")
        .attr("x", widthSong / 2)
        .attr("y", (heightElement - heightSortButton) / 2)
        .attr("dominant-baseline", "central");
    svgTable.append("rect")//sort button up song
        .attr("id", "songup")
        .classed("sort-button", true)
        .attr("x", 0)
        .attr("y", heightElement-heightSortButton)
        .attr("width", widthSong/2)
        .attr("height", heightSortButton)
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .on("click", function(){
              //reset of buttons
              svgTable.selectAll(".sort-button").attr("fill", "white");
              d3.selectAll(".sortText").attr("fill", "black");
              //setting the selected buttton
              d3.select("#songup").attr("fill", "black");
              d3.select("#textSongup").attr("fill", "white");
              //sorting the data
            let sortedData = sortTable(tableData, 1, "asc");
            console.log("sorted", sortedData);
            renderTableData(svgTable, sortedData, attributes);
        });
        
    svgTable.append("text")
        .attr("id", "textSongup")
        .attr("class", "tableHeadline sortText")
        .attr("x", widthSong/4)
        .attr("y", heightElement-heightSortButton/2)
        .style("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text("ascending")
        .style("pointer-events", "none");
       
    svgTable.append("rect")//sort button down song
        .attr("id", "songdown")
        .classed("sort-button", true)
        .attr("x", widthSong/2)
        .attr("y", heightElement-heightSortButton)
        .attr("width", widthSong/2)
        .attr("height", heightSortButton)
        .attr("fill", "white")
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .on("click", function(){
            //reset of buttons
            svgTable.selectAll(".sort-button").attr("fill", "white");
            d3.selectAll(".sortText").attr("fill", "black");
            //setting the selected buttton
            d3.select("#songdown").attr("fill", "black");
            d3.select("#textSongdown").attr("fill", "white");
            //sorting the data
            let sortedData = sortTable(tableData, 1, "desc");
            console.log("sorted", sortedData);
            renderTableData(svgTable, sortedData, attributes);
        });
    svgTable.append("text")
        .attr("id", "textSongdown")
        .attr("class", "tableHeadline sortText")
        .attr("x", 3*widthSong/4)
        .attr("y", heightElement-heightSortButton/2)
        .style("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text("descending")
        .style("pointer-events", "none");

    for (let i = 0; i < attributes.length; i++) {
        svgTable.append("rect")// headline elements for attributes
            .attr("id", attributes[i].id + "Headline")
            .attr("x", widthSong + ((width - widthSong) / attributes.length) * i)
            .attr("y", 0)
            .attr("width", ((width - widthSong) / attributes.length))
            .attr("height", heightElement)
            .attr("fill", "white")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("mouseover", function () {
                d3.selectAll(".values" + attributes[i].id).style("visibility", "visible");
                d3.select("#" + attributes[i].id + "column").style("visibility", "visible");
            })
            .on("mouseout", function () {
                d3.selectAll(".values" + attributes[i].id).style("visibility", "hidden");
                d3.select("#" + attributes[i].id + "column").style("visibility", "hidden");
            });
        svgTable.append("text")
            .style("text-anchor", "middle")
            .text(attributes[i].attribute)
            .attr("class", "tableHeadline")
            .attr("x", widthSong + ((width - widthSong) / attributes.length) * i + ((width - widthSong) / attributes.length) / 2)
            .attr("y", (heightElement - heightSortButton)/ 2)
            .attr("dominant-baseline", "central")
            .style("pointer-events", "none");
        
        svgTable.append("rect")
            .attr("id", attributes[i].id + "up")
            .classed("sort-button", true)
            .attr("x", widthSong + ((width - widthSong) / attributes.length) * i)
            .attr("y", heightElement-heightSortButton)
            .attr("width", ((width - widthSong) / attributes.length)/2)
            .attr("height", heightSortButton)
            .attr("fill", "white")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function(){
                //reset of buttons
                svgTable.selectAll(".sort-button").attr("fill", "white");
                d3.selectAll(".sortText").attr("fill", "black");
                //setting the selected buttton
                d3.select("#" + attributes[i].id + "up").attr("fill", "black");
                d3.select("#text"+ attributes[i].id + "up").attr("fill", "white");
                //sorting the data
                let sortedData = sortTable(tableData, attributes[i].arrayIndex, "asc");
                console.log("sorted", sortedData);
                renderTableData(svgTable, sortedData, attributes);
            });
        svgTable.append("text")
            .attr("id", "text" + attributes[i].id + "up")
            .attr("class", "tableHeadline sortText")
            .attr("x", widthSong + ((width - widthSong) / attributes.length) * i + ((width - widthSong) / attributes.length)/4)
            .attr("y", heightElement-heightSortButton/2)
            .style("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text("asc")
            .style("pointer-events", "none");
        
        svgTable.append("rect")
            .attr("id", attributes[i].id + "down")
            .classed("sort-button", true)
            .attr("x", (widthSong + ((width - widthSong) / attributes.length) * (i+1)) - ((width - widthSong) / attributes.length)/2)
            .attr("y", heightElement-heightSortButton)
            .attr("width", ((width - widthSong) / attributes.length)/2)
            .attr("height", heightSortButton)
            .attr("fill", "white")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function(){
                //reset of buttons
                svgTable.selectAll(".sort-button").attr("fill", "white");
                d3.selectAll(".sortText").attr("fill", "black");
                //setting the selected buttton
                d3.select("#" + attributes[i].id + "down").attr("fill", "black");
                d3.select("#text"+ attributes[i].id + "down").attr("fill", "white");
                //sorting the data
                let sortedData = sortTable(tableData, attributes[i].arrayIndex, "desc");
                console.log("sorted", sortedData);
                renderTableData(svgTable, sortedData, attributes);
            });
        svgTable.append("text")
            .attr("id", "text" + attributes[i].id + "down")
            .attr("class", "tableHeadline sortText")
            .attr("x", (widthSong + ((width - widthSong) / attributes.length) * (i+1)) - ((width - widthSong) / attributes.length)/4)
            .attr("y", heightElement-heightSortButton/2)
            .style("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text("desc")
            .style("pointer-events", "none");
        
        svgTable.append("rect")//higlight of the column
            .attr("id", attributes[i].id + "column")
            .attr("x", widthSong + ((width - widthSong) / attributes.length) * i)
            .attr("y", 0)
            .attr("width", ((width - widthSong) / attributes.length))
            .attr("height", (data.length+1)*heightElement)
            .attr("fill", "none")
            .attr("stroke-width", 4)
            .attr("stroke", "black")
            .style("visibility", "hidden")
        // handling length song selection < 2
        if (data.length == 0){
            svgTable.selectAll("*").remove();
        }
        if (data.length == 1){
            svgTable.append("rect")
                .attr("x", 0)
                .attr("y", heightElement*2)
                .attr("width", width)
                .attr("height", heightElement)
                .attr("fill", "#fff3cd")
                .attr("stroke-width", 2) 
            svgTable.append("text")
                .attr("x", margin.left)
                .attr("y", heightElement*2 + heightElement/2)
                .text("Select at least one other song for which you want to compare the attributes.")
                .attr("fill", "#856404")
        }
        if (data.length == 2){
            svgTable.append("rect")
                .attr("x", 0)
                .attr("y", heightElement*3)
                .attr("width", width)
                .attr("height", heightElement+ margin.bottom)
                .attr("fill", "#fff3cd")
                .attr("stroke-width", 2) 
            svgTable.append("text")
                .attr("x", margin.left)
                .attr("y", heightElement*3 + heightElement/2)
                .html(`<tspan dy="0">Note that the elements show how the attributes compare in the songselection</tspan><br><tspan x="5" dy="1.2em">With two songs selected, the table does not show the degree to which the values vary.</tspan>`)
                .attr("fill", "#856404")
        }
    };
    return svgTable;
}
function renderTableData (svgTable, tableData, attributes){
    // making the table grid and append the values to the table
    svgTable.selectAll(".valuesInTable").remove();
    for (let i = 0; i < tableData.length; i++) {
        svgTable.append("clipPath")// for the scrolling text while hovering over one specific song
            .attr("id", "clip-border" + i)
            .classed("valuesInTable", true)
            .append("rect")
            .attr("x", 5)
            .attr("y", heightElement + heightElement * i)
            .attr("width", widthSong - 10)
            .attr("height", heightElement);

        svgTable.append("rect") // addig the box for the song title
            .attr("class", "songInTable Row" + i)
            .classed("valuesInTable", true)
            .attr("x", 0)
            .attr("y", heightElement + heightElement * i)
            .attr("width", widthSong)
            .attr("height", heightElement)
            .attr("fill", tableData[i][11])
            .attr("stroke-width", 2)
            .attr("stroke","black")
            .on("mouseover", function () {
                d3.select("#Row" + i + "highlight").attr("stroke", tableData[i][11]).attr("stroke-width", 4).style("visibility", "visible");// change for row outline highlight
                d3.select("#song" + i + "inTable").style("visibility", "hidden"); // hides the cropped static song titles
                makeScrolingSongTitle(svgTable, tableData, widthSong, i); //places the scrolling song title
            })
            .on("mouseout", function () {
                d3.select("#Row" + i + "highlight").style("visibility", "hidden"); // removes row higlighting
                d3.select("#song" + i + "inTable").style("visibility", "visible");// shows the cropt static text
                d3.select("#song" + i + "inTableScroll").remove();// removes the scrolling text
            });
        

        svgTable.append("text")// append static title to first collunm
            .attr("id", "song" + i + "inTable")
            .classed("valuesInTable", true)
            .attr("x", 5)
            .attr("y", heightElement + heightElement * i + heightElement / 4)
            .attr("dominant-baseline", "central")
            .html(`<tspan class="card-title" dy="0">${cropText(svgTable, tableData[i][1], widthSong)}</tspan><br><tspan class="card-text" x="5" dy="1.2em">${cropText(svgTable, tableData[i][2], widthSong)}</tspan>`)
            .on("mouseover", function () {
                d3.select("#Row" + i + "highlight").attr("stroke", tableData[i][11]).attr("stroke-width", 4).style("visibility", "visible");// change for row outline highlight
                d3.select("#song" + i + "inTable").style("visibility", "hidden"); // hides the cropped static song titles
                makeScrolingSongTitle(svgTable, tableData, widthSong, i); //places the scrolling song title
            })
            .on("mouseout", function () {
                d3.select("#Row" + i + "highlight").style("visibility", "hidden"); // removes row higlighting
                d3.select("#song" + i + "inTable").style("visibility", "visible");// shows the cropt static text
                d3.select("#song" + i + "inTableScroll").remove();// removes the scrolling text
            });



        for (let j = 0; j < attributes.length; j++) {
            svgTable.append("rect")
                .attr("id", attributes[j].id + " Row" + i)
                .classed("valuesInTable", true)
                .attr("x", widthSong + ((width - widthSong) / attributes.length) * j)
                .attr("y", heightElement + heightElement * i)
                .attr("width", ((width - widthSong) / attributes.length))
                .attr("height", heightElement)
                .attr("fill", "black")
                .attr("stroke-width", 2)
                .attr("fill-opacity", attributes[j].scale(tableData[i][attributes[j].arrayIndex]))
                .attr("stroke", "none")
                .on("mouseover", function () {
                    d3.select("#Row" + i + "highlight").attr("stroke", tableData[i][11]).style("visibility", "visible");
                    d3.select("#" + attributes[j].id + "Row" + i + "value").style("visibility", "visible");
                })
                .on("mouseout", function () {
                    d3.select("#Row" + i + "highlight").style("visibility", "hidden"); // removes row higlighting
                    d3.select("#" + attributes[j].id + "Row" + i + "value").style("visibility", "hidden");
                });
            svgTable.append("text")
                .attr("id", attributes[j].id + "Row" + i + "value")
                .classed("valuesInTable tableHeadline" + " values" + attributes[j].id, true)
                .style("text-anchor", "middle")
                .text(tableData[i][attributes[j].arrayIndex])
                .attr("x", widthSong + ((width - widthSong) / attributes.length) * (j + 0.5))
                .attr("y", heightElement + heightElement * (i + 0.5))
                .attr("dominant-baseline", "central")
                .style("visibility", "hidden")
                .style("pointer-events", "none");
            if (attributes[j].scale(tableData[i][attributes[j].arrayIndex]) < 0.5){
                d3.select("#" + attributes[j].id + "Row" + i + "value").attr("fill", "black");  
            }
            else{
                d3.select("#" + attributes[j].id + "Row" + i + "value").attr("fill", "white");
            }
        }
        svgTable.append("rect")// adding box for higlighting a row when on hover
            .attr("id", "Row" + i + "highlight")
            .classed("valuesInTable", true)
            .attr("x", 0)
            .attr("y", heightElement + (heightElement * i))
            .attr("width", width)
            .attr("height", heightElement)
            .attr("fill", "none")
            .attr("stroke-width", 4)
            .style("pointer-events", "none");
    }
}

// Margin object with properties for the four directions
const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
};

// Width and height as the inner dimensions of the chart area
const width = 720 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

const widthSong = 150
const heightElement = height / 11
const heightSortButton = 15

const renderTable = () => {
    let sortedData = [];
    let data = selectedSongs
    let tableData = prepDataTable(data);    
   
    // Definition of the luminance scales which are then stored in "attributes" as "scale"
    let colorScaleDanceability = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.danceability
        }),
        d3.max(data, function (d) {
            return d.danceability
        })])
        .range([0, 1]);
    let colorScaleEnergy = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.energy
        }),
        d3.max(data, function (d) {
            return d.energy
        })])
        .range([0, 1]);
    let colorScaleAcousticness = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.acousticness
        }),
        d3.max(data, function (d) {
            return d.acousticness
        })])
        .range([0, 1]);
    let colorScaleSpeechiness = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.speechiness
        }),
        d3.max(data, function (d) {
            return d.speechiness
        })])
        .range([0, 1]);
    let colorScaleLiveness = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.liveness
        }),
        d3.max(data, function (d) {
            return d.liveness
        })])
        .range([0, 1]);
    let colorScaleTempo = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.tempo
        }),
        d3.max(data, function (d) {
            return d.tempo
        })])
        .range([0, 1]);
    let colorScaleValence = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.valence
        }),
        d3.max(data, function (d) {
            return d.valence
        })])
        .range([0, 1]);
    let colorScaleLoudness = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
            return d.loudness
        }),
        d3.max(data, function (d) {
            return d.loudness
        })])
        .range([0, 1]);

    const attributes = [{ id: "danceability", attribute: "Danceability", scale: colorScaleDanceability, arrayIndex: 3, description: "Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable." },
    { id: "energy", attribute: "Energy", scale: colorScaleEnergy, arrayIndex: 4, description: "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy." },
    { id: "acousticness", attribute: "Acousticness", scale: colorScaleAcousticness, arrayIndex: 5, description: "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic." },
    { id: "speechiness", attribute: "Speechiness", scale: colorScaleSpeechiness, arrayIndex: 6, description: "Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks." },
    { id: "liveness", attribute: "Liveness", scale: colorScaleLiveness, arrayIndex: 7, description: "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live." },
    { id: "tempo", attribute: "Tempo", scale: colorScaleTempo, arrayIndex: 8, description: "The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration." },
    { id: "valence", attribute: "Valence", scale: colorScaleValence, arrayIndex: 9, description: "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)." },
    { id: "loudness", attribute: "Loudness", scale: colorScaleLoudness, arrayIndex: 10, description: "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db." }]

   
    let svgTable = renderTableOutline(tableData, data, attributes);
    renderTableData (svgTable, tableData, attributes);
    


}



