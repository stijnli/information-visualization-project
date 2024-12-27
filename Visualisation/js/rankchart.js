// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#rank_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

let measurements = [];
function setMeasurements(data) {
  measurements = data;
}

function renderRankChart() {
  console.log(selectedSongs);
  let selectedSongsIds = selectedSongs.map((song) => song.id);
  console.log(ids);
  // console.log(measurements) //0vrKBjEBQAVn3sdhIXmpHE
  let rankings = measurements.filter((entry) => selectedSongsIds.includes(entry.spotify_id) && entry.country === 'NL');
  console.log(rankings);
}

d3.csv(
  "data/measurementssmallnl.csv",

  // When reading the csv, I must format variables:
  // function (d) {
  //   return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
  // }
).then(
  // Now I can use this dataset:
  function (data) {
    // Add X axis --> it is a date format
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);
    xAxis = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ])
      .range([height, 0]);
    yAxis = svg.append("g").call(d3.axisLeft(y));

    setMeasurements(data);
  }
);
