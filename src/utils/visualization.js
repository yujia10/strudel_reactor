import * as d3 from "d3";

export function extractValue(input, parameter) {
  if (!input) return 0;
  const stringArray = input.split(/(\s+)/);

  for (const item of stringArray) {
    if (item.startsWith(`${parameter}:`)) {
      const val = item.substring(parameter.length + 1);
      return Number(val);
    }
  }
  return 0;
}

export function handleD3Data(event) {
  // console.log(event.detail);
  const array = event.detail;
  const numericArray = array.map((str) => extractValue(str, "postgain")); // extract the value after "gain:"
  if (numericArray.length > 0) {
    updateD3(numericArray);
  }
}

export function updateD3(data) {
  const svg = d3.select("#d3-visualizer");

  const width = svg.node().getBoundingClientRect().width;
  const height = svg.node().getBoundingClientRect().height;

  const maxBars = 40;
  const barWidth = width / maxBars; // Fixed width

  // Pad with minimum values if data is insufficient
  const paddedData = Array(maxBars).fill(0.1);
  const displayData = data.slice(-maxBars);

  // Place actual data at the end
  displayData.forEach((val, i) => {
    paddedData[maxBars - displayData.length + i] = val;
  });

  const yScale = d3.scaleLinear().domain([0, 3]).range([height, 0]);

  const colorScale = d3
    .scaleLinear()
    .domain([0, 1.5, 3])
    .range(["#e6ffcc", "#b9ff66", "#4caf50"]);

  // Select or Create chartGroup
  let chartGroup = svg.select(".chart-group");
  if (chartGroup.empty()) {
    chartGroup = svg
      .append("g")
      .classed("chart-group", true)
      .attr("transform", "translate(0,0)");
  }

  // Bind data to g
  const barGroups = chartGroup.selectAll("g.bar-group").data(paddedData);

  // Create new <g> and <rect>
  const newBarGroups = barGroups
    .enter()
    .append("g")
    .classed("bar-group", true)
    .attr("transform", (d, i) => `translate(${i * barWidth}, 0)`);

  newBarGroups
    .append("rect")
    .attr("x", 0)
    .attr("width", barWidth - 1)
    .attr("y", height)
    .attr("height", 0)
    .attr("fill", (d) => colorScale(d))
    .transition()
    .duration(400)
    .attr("y", (d) => yScale(d))
    .attr("height", (d) => height - yScale(d));

  // Update
  chartGroup
    .selectAll("g.bar-group")
    .select("rect")
    .transition()
    .duration(300)
    .attr("y", (d) => yScale(d))
    .attr("height", (d) => height - yScale(d))
    .attr("fill", (d) => colorScale(d));

  // Handle exit
  barGroups.exit().remove();
}
