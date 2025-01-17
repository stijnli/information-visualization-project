let svg;
let measurements = [];
let selectedCountry = "";
let countryOptions = [];

const globalName = "Global";
const oneDay = 86400000;
const noDataMessage = 'No Ranking data found for selected songs. Select different songs or choose a different country in the dropdown below.'

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 70, left: 60 };
const width = 550 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

function setMeasurements(data) {
    measurements = data;
}

function setSelectedCountry(countryCode) {
    selectedCountry = countryCode;
}

function setCountryOptions(listOfCountryOptions) {
    countryOptions = listOfCountryOptions;
}

// If a song is not in the graph for a day, line to 51
function wrangleMeasurements(groupedSelectedMeasurements) {
    let previousEntry;
    let newEntries;
    let currentSongData;

    for (const songMeasurements of groupedSelectedMeasurements) {
        newEntries = [];
        previousEntry = null;
        currentSongData = songMeasurements[1];
        currentSongData.sort(function (a, b) {
            return a.snapshot_date - b.snapshot_date;
        });

        for (const measurement of currentSongData) {
            // the first iteration, add rise from bottom
            if (previousEntry === null) {
                newEntries.push({
                    spotify_id: measurement.spotify_id,
                    snapshot_date: new Date(
                        measurement.snapshot_date.getTime() - oneDay
                    ),
                    daily_rank: 52,
                    country: measurement.country,
                });

                previousEntry = measurement;
                continue;
            }

            // calculate the difference between the two data points
            diff = Math.floor((measurement.snapshot_date - previousEntry.snapshot_date) / (1000 * 60 * 60 * 24));

            // when two dates are not consecutive, add a fall/rise to/from bottom
            if (diff > 1) {

                // if there is a difference of more than 1 day between dates, add fall after previous point and rise before next
                if (diff > 2) {
                    newEntries.push({
                        spotify_id: previousEntry.spotify_id,
                        snapshot_date: new Date(
                            previousEntry.snapshot_date.getTime() + oneDay
                        ),
                        daily_rank: 52,
                        country: previousEntry.country,
                    });
                    newEntries.push({
                        spotify_id: measurement.spotify_id,
                        snapshot_date: new Date(
                            measurement.snapshot_date.getTime() - oneDay
                        ),
                        daily_rank: 52,
                        country: measurement.country,
                    });
                } else {
                    // if there is a difference of exactly 1 day, add just 1 data point
                    newEntries.push({
                        spotify_id: previousEntry.spotify_id,
                        snapshot_date: new Date(
                            previousEntry.snapshot_date.getTime() + oneDay
                        ),
                        daily_rank: 52,
                        country: previousEntry.country,
                    });
                }
            }
            previousEntry = measurement;
        }

        // add the new data points and sort everything on date again
        songMeasurements[1].push(...newEntries);
        songMeasurements[1].sort(function (a, b) {
            return a.snapshot_date - b.snapshot_date;
        });
    }
}

function initRankChart() {
    // append the svg object to the body of the page
    svg = d3
        .select("#rank_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "rankChartSVG")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append('clipPath')
        .attr('id', 'clipRect')
        .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', width)
            .attr('height', height);
}

function initCountryOptions(alpha2ToCountryCode) {
    let countryOptions = [];
    let optionObject;

    // get a list of unique countries in the measurements data
    let uniqueCountries = [...new Set(measurements.map((d) => d.country))];

    // create options object for each country in the measurement data, using the country name from the json
    for (const countryCode of uniqueCountries) {
        countryName = alpha2ToCountryCode[countryCode] ?? null;
        if (countryName === null) {
            continue;
        }

        optionObject = {
            countryCode: countryCode,
            countryName: countryName,
            greyed: false,
            pinned: false,
        };

        countryOptions.push(optionObject);
    }

    // add the global option
    countryOptions.push({
        countryCode: "",
        countryName: globalName,
        greyed: false,
        pinned: true,
    });

    setCountryOptions(countryOptions);
}

// onchange of the countries dropdown
function selectCountry(countryCode) {
    setSelectedCountry(countryCode);
    updateCountryDropdownMenu();
    updateRankChart();
}

function updateCountryDropdownMenu() {
    // get list of countries where any of the selected songs have measurement data
    let selectedSongsIds = selectedSongs.map((song) => song.id);
    let selectedSongMeasurements = measurements.filter((entry) =>
        selectedSongsIds.includes(entry.spotify_id)
    );
    let countriesForSelectedSongs = [
        ...new Set(selectedSongMeasurements.map((d) => d.country)),
    ];

    // if there is no data for a country, set it to greyed
    for (const countryOption of countryOptions) {
        if (countriesForSelectedSongs.includes(countryOption.countryCode)) {
            countryOption.greyed = false;
        } else {
            countryOption.greyed = true;
        }
    }

    // sort the country list: first the pinned countries, then a sorted list of available, then sorted unavailable
    let notGreyed = countryOptions.filter(
        (d) => d.greyed === false && d.pinned === false
    );
    let greyed = countryOptions.filter(
        (d) => d.greyed === true && d.pinned === false
    );
    let pinned = countryOptions.filter((d) => d.pinned === true);

    setCountryOptions([
        ...pinned,
        ...sortCountryOptionsAlphabetically(notGreyed),
        ...sortCountryOptionsAlphabetically(greyed),
    ]);

    // map the countryOptions object to DOM options objects
    let optionsList = [];
    let newOption;
    countrySelect = document.getElementById("countrySelect");

    for (const countryOption of countryOptions) {
        newOption = new Option(
            countryOption.countryName,
            countryOption.countryCode,
            null,
            selectedCountry === countryOption.countryCode
        );

        if (countryOption.greyed === true) {
            newOption.classList.add("greyed");
        }

        optionsList.push(newOption);
    }

    countrySelect.replaceChildren(...optionsList);
}

function updateRankChart() {
    // Remove all lines in the graph
    svg.selectAll("g").remove();
    svg.selectAll("path").remove();

    // Get ranking data from selected songs and group by spotify id
    let selectedSongsIds = selectedSongs.map((song) => song.id);
    let selectedSongMeasurements = measurements.filter(
        (entry) =>
            selectedSongsIds.includes(entry.spotify_id) &&
            entry.country === selectedCountry
    );
    let groupedSelectedMeasurements = d3.group(
        selectedSongMeasurements,
        (d) => d.spotify_id
    );

    wrangleMeasurements(groupedSelectedMeasurements);

    // render a message if no data is displayed in the chart
    const elem = d3.select("#rankChartCol");
    const svgElem = d3.select("#rankChartSVG");
    elem.select("#rankChartNoDataAlert").remove();

    if (groupedSelectedMeasurements.size === 0) {
        svgElem.style('display', 'none')

        elem.insert('div', "#countrySelect")
        .attr('class', 'alert alert-warning')
        .attr('id', 'rankChartNoDataAlert')
        .attr('role', 'alert')
        .text(noDataMessage);
        return;
    }
    svgElem.style('display', null)

    // Scale the x-axis for time data
    const xExtend = d3.extent(selectedSongMeasurements, (d) => d.snapshot_date)

    const x = d3
        .scaleTime()
        .domain([new Date(xExtend[0].getTime() - oneDay), xExtend[1]])
        .nice()
        .range([0, width]);
    xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    xAxis.selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")

    xAxis.append('text')
    .attr('class', 'axis-label')
    .text('Time')
    .attr('x', margin.left + (width - margin.left - margin.right) / 2)
    .attr('y', 55) // Relative to the x axis.

    // Scale the y-axis for ranking 1-50
    const y = d3.scaleLinear().domain([50, 0]).range([height, 0]);
    yAxis = svg
    .append("g")
    .call(d3.axisLeft(y))
    .append('text')
    .attr('class', 'axis-label')
    .text('Ranking in the Top 50')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(margin.top + (height - margin.top - margin.bottom) / 2))
    .attr('y', -40) // Relative to the y axis.

    // Draw the ranking lines
    svg.selectAll(".line")
        .data(groupedSelectedMeasurements)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", (d) => getSongColor(d[0]))
        .attr("stroke-width", 3)
        .attr("opacity", 0.6)
        .attr("border", 0)
        .attr("id", (d) => `rankchart-${d[0]}`)
        .attr("d", (d) =>
            d3
                .line()
                .x((d) => x(d.snapshot_date))
                .y((d) => y(+d.daily_rank))(d[1])
        )
        .attr('clip-path', 'url("#clipRect")')
        .clone()
        .attr("stroke", "transparent")
        .attr("stroke-width", 15)
        .attr("onmouseover", (d) => `setCurrentHoveredSongId('${d[0]}')`)
        .attr("onmouseout", "setCurrentHoveredSongId(undefined)");
}

function sortCountryOptionsAlphabetically(arrayOfOptions) {
    return arrayOfOptions.sort((a, b) =>
        a.countryName.localeCompare(b.countryName, "en", {
            sensitivity: "base",
        })
    );
}
