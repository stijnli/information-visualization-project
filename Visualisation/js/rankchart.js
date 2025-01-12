
let svg;
let measurements = [];
let selectedCountry = "";
let countryOptions = [];
const globalName = "Global";

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 500 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

function setMeasurements(data) {
  measurements = data;
};

function setSelectedCountry(countryCode) {
  selectedCountry = countryCode;
};

function setCountryOptions(listOfCountryOptions) {
  countryOptions = listOfCountryOptions;
};

function updateCountryDropdownMenu() {
  let selectedSongsIds = selectedSongs.map((song) => song.id);
  let selectedSongMeasurements = measurements.filter((entry) => selectedSongsIds.includes(entry.spotify_id));
  let countriesForSelectedSongs = [...new Set(selectedSongMeasurements.map((d) => d.country))]

  for (const countryOption of countryOptions) {
    if (countriesForSelectedSongs.includes(countryOption.countryCode)) {
      countryOption.greyed = false;
    } else {
      countryOption.greyed = true;
    }
  }

  var notGreyed = countryOptions.filter((d) => d.greyed === false && d.pinned === false);
  var greyed = countryOptions.filter((d) => d.greyed === true && d.pinned === false);
  var pinned = countryOptions.filter((d) => d.pinned === true);

  setCountryOptions([
    ...pinned,
    ...sortCountryOptionsAlphabetically(notGreyed),
    ...sortCountryOptionsAlphabetically(greyed),
  ]);

  let optionsList = [];
  let newOption;
  countrySelect = document.getElementById("countrySelect");
  for (const countryOption of countryOptions) {
    newOption = new Option(
      countryOption.countryName,
      countryOption.countryCode,
      null,
      selectedCountry === countryOption.countryCode
    )
    if (countryOption.greyed === true) {
      newOption.classList.add("greyed");
    }

    optionsList.push(newOption);
  }

  countrySelect.replaceChildren(...optionsList);
}

function selectCountry(countryCode) {
  setSelectedCountry(countryCode);
  updateCountryDropdownMenu();
  renderRankChart();
}

function initRankChart() {
  console.log('draw image');

  // append the svg object to the body of the page
  svg = d3
    .select("#rank_chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

}

function sortCountryOptionsAlphabetically(arrayOfOptions) {
  return arrayOfOptions.sort((a, b) =>
    a.countryName.localeCompare(b.countryName, "en", { sensitivity: "base" })
  );
}

function renderRankChart() {
  // Remove all lines in the graph
  svg.selectAll("*").remove();

  // Get ranking data from selected songs and group by spotify id
  let selectedSongsIds = selectedSongs.map((song) => song.id);
  let selectedSongMeasurements = measurements.filter(
    (entry) =>
      selectedSongsIds.includes(entry.spotify_id) &&
      entry.country === selectedCountry
  );
  var groupedSelectedMeasurements = d3.group(
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
  svg
    .selectAll(".line")
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

// // Read the CSV and format it for D3
// d3.csv("data/measurements_full.csv", (d) => {
//   return {
//     spotify_id: d.spotify_id,
//     snapshot_date: d3.timeParse("%Y-%m-%d")(d.snapshot_date),
//     daily_rank: d.daily_rank,
//     country: d.country,
//   };
// })
//   .then((data) => {
//     setMeasurements(data);

//     return fetch("data/alpha2ToCountryName.json");
//   })
//   .then((response) => response.json())
//   .then((alpha2ToCountryCode) => {
//     let countryOptions = [];
//     let optionObject;

//     let uniqueCountries = [...new Set(measurements.map((d) => d.country))]

//     for (const countryCode of uniqueCountries) {
//       countryName = alpha2ToCountryCode[countryCode] ?? null;
//       if (countryName === null) {
//         continue;
//       }
//       optionObject = {
//         countryCode: countryCode,
//         countryName: countryName,
//         greyed: false,
//         pinned: false,
//       };

//       countryOptions.push(optionObject);
//     }

//     countryOptions.push({
//       countryCode: "",
//       countryName: globalName,
//       greyed: false,
//       pinned: true,
//     });

//     setCountryOptions(countryOptions);
//   });
