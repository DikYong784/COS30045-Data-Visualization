// ---------- Exercise 6.2: filter buttons ----------
const populateFilters = data => {

  // Filters the data by the active buttons, then redraws the bars
  const updateHistogram = () => {
    const activeIds = filters_screen.filter(f => f.isActive).map(f => f.id);

    const updatedData = activeIds.includes("all")
      ? data
      : data.filter(d => activeIds.includes(d.screenTech.toUpperCase()));

    const updatedBins = binGenerator(updatedData);

    // Rescale y for the new counts and animate the axis
    yScale.domain([0, d3.max(updatedBins, d => d.length) || 1]).nice();
    innerChart.select(".y-axis")
      .transition().duration(600)
      .call(d3.axisLeft(yScale));

    renderBars(updatedBins);
  };

  d3.select("#filters_screen")
    .selectAll("button")
    .data(filters_screen)
    .join("button")
      .attr("class", "filter-btn")
      .classed("active", d => d.isActive)
      .text(d => d.label)
      .on("click", (e, d) => {
        console.log("clicked", d.id);

        if (d.id === "all") {
          // "All" switches every other filter off
          filters_screen.forEach(f => f.isActive = (f.id === "all"));
        } else {
          d.isActive = !d.isActive;
          filters_screen.find(f => f.id === "all").isActive = false;
          // If nothing is selected, go back to "All"
          if (!filters_screen.some(f => f.isActive)) {
            filters_screen.find(f => f.id === "all").isActive = true;
          }
        }

        d3.selectAll("#filters_screen button")
          .classed("active", f => f.isActive);

        updateHistogram();
      });
};

// ---------- Exercise 6.4: tooltip ----------
const createTooltip = () => {

  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", barColor)
    .attr("opacity", 0.9);

  const text = tooltip.append("text")
    .attr("class", "tooltip-text");

  text.append("tspan").attr("class", "tt-title").attr("x", 10).attr("y", 20);
  text.append("tspan").attr("class", "tt-model").attr("x", 10).attr("y", 37);
  text.append("tspan").attr("class", "tt-size").attr("x", 10).attr("y", 54);
};

const handleMouseEvents = () => {

  const tooltip = innerChartS.select(".tooltip");
  const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s || "");

  innerChartS.selectAll(".dot")
    .on("mouseenter", (e, d) => {
      tooltip.select(".tt-title").text(clip(d.brand, 24));
      tooltip.select(".tt-model").text(clip(d.model, 26));
      tooltip.select(".tt-size").text(`Screen size: ${d.screenSize}"`);

      const cx = +e.target.getAttribute("cx");
      const cy = +e.target.getAttribute("cy");

      // Keep the tooltip inside the chart, above the dot when there is room
      const x = Math.max(0, Math.min(cx - tooltipWidth / 2, innerChartWidth - tooltipWidth));
      const y = cy - tooltipHeight - 10 < 0 ? cy + 10 : cy - tooltipHeight - 10;

      tooltip
        .attr("transform", `translate(${x}, ${y})`)
        .raise()
        .transition().duration(150)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      tooltip
        .transition().duration(150)
        .style("opacity", 0)
        .on("end", () => tooltip.attr("transform", "translate(-500, -500)"));
    });
};
