// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 500 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#rank_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

let measurements = [];
const setMeasurements = (data) => {
  measurements = data;
}

function renderRankChart() {
  // Remove all lines in the graph
  svg.selectAll("*").remove();

  // Get ranking data from selected songs and group by spotify id
  let selectedSongsIds = selectedSongs.map((song) => song.id);
  let selectedSongMeasurements = measurements.filter(
    (entry) =>
      selectedSongsIds.includes(entry.spotify_id) && entry.country === "NL" // TODO currently only for NL, should be different
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
    .attr("id", (d) => `rankchart-'${d[0]}'`)
    .attr("d", (d) =>
      d3
        .line()
        .x((d) => x(d.snapshot_date))
        .y((d) => y(+d.daily_rank))(d[1])
    ).clone()
    .attr('stroke', 'transparent').attr('stroke-width', 15)
    .attr("onmouseover",(d) => `setCurrentHoveredSongId('${d[0]}')`)
    .attr("onmouseout", "setCurrentHoveredSongId(undefined)")
}

// Read the CSV and format it for D3
d3.csv("data/measurementssmallnl.csv", (d) => {
  return {
    spotify_id: d.spotify_id,
    snapshot_date: d3.timeParse("%Y-%m-%d")(d.snapshot_date),
    daily_rank: d.daily_rank,
    country: d.country,
  };
}).then((data) => {
  setMeasurements(data);
});
