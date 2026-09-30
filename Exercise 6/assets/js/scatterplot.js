const drawScatterplot = allData => {

  // Leave out the extreme outlier so the chart stays readable
  const data = allData.filter(d => d.energyConsumption <= maxEnergy);

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Scales
  xScaleS.domain([0, d3.max(data, d => d.star)]).nice().range([0, innerChartWidth]);
  yScaleS.domain([0, d3.max(data, d => d.energyConsumption)]).nice().range([innerChartHeight, 0]);

  const techs = [...new Set(data.map(d => d.screenTech))].filter(Boolean).sort();
  colorScale.domain(techs);

  // Circles
  innerChartS.selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("r", 4)
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // Axes
  innerChartS.append("g")
    .attr("transform", `translate(0, ${innerChartHeight})`)
    .call(d3.axisBottom(xScaleS));

  innerChartS.append("g")
    .call(d3.axisLeft(yScaleS));

  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("x", innerChartWidth / 2)
    .attr("y", innerChartHeight + 55)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  innerChartS.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerChartHeight / 2)
    .attr("y", -55)
    .attr("text-anchor", "middle")
    .text("Energy Consumption");

  // Legend (top right)
  const legend = innerChartS.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${innerChartWidth - 80}, 0)`);

  const legendItem = legend.selectAll("g")
    .data(techs)
    .join("g")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legendItem.append("rect")
    .attr("width", 14)
    .attr("height", 14)
    .attr("fill", d => colorScale(d));

  legendItem.append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text(d => d);
};
