const drawHistogram = data => {

  const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Bins
  const bins = binGenerator(data);
  console.log("Bins:", bins);

  // Scales
  const minX = bins[0].x0;
  const maxX = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale.domain([minX, maxX]).range([0, innerChartWidth]);
  yScale.domain([0, binsMaxLength]).nice().range([innerChartHeight, 0]);

  // Axes
  innerChart.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerChartHeight})`)
    .call(d3.axisBottom(xScale));

  innerChart.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

  // Axis labels
  innerChart.append("text")
    .attr("class", "axis-label")
    .attr("x", innerChartWidth / 2)
    .attr("y", innerChartHeight + 55)
    .attr("text-anchor", "middle")
    .text("Energy Consumption");

  innerChart.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerChartHeight / 2)
    .attr("y", -55)
    .attr("text-anchor", "middle")
    .text("Number of TV Models");

  renderBars(bins);
};

// Draws or updates the bars (also used by the filters in interactions.js)
const renderBars = bins => {
  innerChart.selectAll(".bar")
    .data(bins)
    .join(
      enter => enter.append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.x0))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr("y", innerChartHeight)
        .attr("height", 0)
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2),
      update => update,
      exit => exit.remove()
    )
    .transition()
    .duration(600)
    .ease(d3.easeCubicOut)
    .attr("y", d => yScale(d.length))
    .attr("height", d => innerChartHeight - yScale(d.length));
};
