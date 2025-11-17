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

export function handleD3Data(event){
  // console.log(event.detail);
  const array = event.detail;
  const numericArray = array
    .map((str) => extractValue(str, "gain"))
    .filter((n) => !isNaN(n) && n > 0);
  if (numericArray.length > 0) {
    updateD3(numericArray);
  }
};

export function updateD3(data) {
  const svg = d3.select("#d3-visualizer");
  const width = svg.node().getBoundingClientRect().width;
  const height = svg.node().getBoundingClientRect().height;

  if (svg.empty()) return;

  const maxBars = 40;
  const barWidth = width / maxBars; // Fixed width

  // Pad with minimum values if data is insufficient
  const paddedData = Array(maxBars).fill(0.1);
  const displayData = data.slice(-maxBars);

  // Place actual data at the end
  displayData.forEach((val, i) => {
    paddedData[maxBars - displayData.length + i] = val;
  });

  const yScale = d3.scaleLinear().domain([0.1, 2]).range([0, height]);

  const colorScale = d3
    .scaleLinear()
    .domain([0.1, 1, 2])
    .range(["#e6ffcc", "#b9ff66", "#4caf50"]);

  const bars = svg.selectAll("rect").data(displayData);

  bars
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * barWidth)
    .attr("width", barWidth - 1)
    .attr("y", height)
    .attr("height", 0)
    .attr("fill", (d) => colorScale(d))
    .attr("opacity", 0.8)
    .merge(bars)
    .attr("x", (d, i) => i * barWidth)
    .attr("width", barWidth - 1)
    .attr("fill", (d) => colorScale(d))
    .transition()
    .duration(400)
    .ease(d3.easeCubicOut)
    .attr("y", (d) => height - yScale(d))
    .attr("height", (d) => yScale(d));

  bars.exit().remove();
}
