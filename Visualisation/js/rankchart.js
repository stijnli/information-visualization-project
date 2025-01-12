let svg;
let measurements = [];
let selectedCountry = "";
let countryOptions = [];
const globalName = "Global";

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 };
const width = 500 - margin.left - margin.right;
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

function initRankChart() {
    console.log("draw image");

    // append the svg object to the body of the page
    svg = d3
        .select("#rank_chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
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
    svg.selectAll("*").remove();

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

    // Scale the x-axis for time data
    const x = d3
        .scaleTime()
        .domain(d3.extent(selectedSongMeasurements, (d) => d.snapshot_date))
        .range([0, width]);
    xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Scale the y-axis for ranking 1-50
    const y = d3.scaleLinear().domain([51, 1]).range([height, 0]);
    yAxis = svg.append("g").call(d3.axisLeft(y));

    // Draw the ranking lines
    svg.selectAll(".line")
        .data(groupedSelectedMeasurements)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", (d) => getSongColor(d[0]))
        .attr("stroke-width", 3)
        .attr("opacity", 0.5)
        .attr("id", (d) => `rankchart-'${d[0]}'`)
        .attr("d", (d) =>
            d3
                .line()
                .x((d) => x(d.snapshot_date))
                .y((d) => y(+d.daily_rank))(d[1])
        )
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
