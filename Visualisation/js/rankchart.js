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
  let selectedSongsIds = selectedSongs.map((song) => song.id);
  let rankings = measurements.filter(
    (entry) =>
      selectedSongsIds.includes(entry.spotify_id) && entry.country === "NL"
  );

  var sumstat = d3.group(rankings, (d) => d.spotify_id);

  const x = d3
    .scaleTime()
    .domain(
      d3.extent(measurements, function (d) {
        return d.snapshot_date;
      })
    )
    .range([0, width]);

  xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  const y = d3
    .scaleLinear()
    .domain([51,1])
    .range([height, 0]);
  yAxis = svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll(".line")
    .data(sumstat)
    .join("path")
    .attr("fill", "none")
    .attr("stroke", d => getSongColor(d[0]))
    .attr("stroke-width", 1.5)
    .attr("d", (d) => {
      return d3
        .line()
        .x((d) => {
          return x(d.snapshot_date);
        })
        .y((d) => {
          return y(+d.daily_rank);
        })(d[1]);
    });
}

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
