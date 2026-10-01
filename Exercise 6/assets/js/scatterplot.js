function drawScatterplot(data) {

    console.log("Scatterplot data:", data);

    const width = 900;
    const height = 600;

    const margin = {
        top: 50,
        right: 40,
        bottom: 80,
        left: 90
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto");

    const chart = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left},${margin.top})`
        );

    // X scale
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.star2)])
        .nice()
        .range([0, innerWidth]);

    // Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energyConsumption)])
        .nice()
        .range([innerHeight, 0]);

    // Colour scale (one hue per screen type)
    const colourScale = d3.scaleOrdinal()
        .domain(["LED", "LCD", "OLED"])
        .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    // Tooltip (plain HTML, follows the mouse)
    d3.select(".tooltip-html").remove();

    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip-html")
        .style("opacity", 0);

    // Draw circles
    chart.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.star2))
        .attr("cy", d => yScale(d.energyConsumption))
        .attr("r", 5)
        .attr("fill", d => colourScale(d.screenTechnology))
        .attr("opacity", 0.5)
        .on("mouseenter", (event, d) => {
            tooltip
                .html(
                    `<strong>${d.brand}</strong><br>${d.model}<br>` +
                    `${d.screenTechnology}<br>` +
                    `Energy: ${d.energyConsumption}<br>Stars: ${d.star2}`
                )
                .style("left", (event.pageX + 12) + "px")
                .style("top", (event.pageY - 12) + "px")
                .style("opacity", 1);
        })
        .on("mousemove", event => {
            tooltip
                .style("left", (event.pageX + 12) + "px")
                .style("top", (event.pageY - 12) + "px");
        })
        .on("mouseleave", () => {
            tooltip.style("opacity", 0);
        });

    // X axis
    chart.append("g")
        .attr(
            "transform",
            `translate(0,${innerHeight})`
        )
        .call(
            d3.axisBottom(xScale)
                .ticks(8)
                .tickFormat(d3.format("d"))
        );

    // Y axis
    chart.append("g")
        .call(
            d3.axisLeft(yScale)
                .tickFormat(d3.format(","))
        );

    // X label (bottom right)
    chart.append("text")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 55)
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .style("font-size", "14px")
        .text("Star Rating");

    // Y label (horizontal, top left)
    chart.append("text")
        .attr("x", -margin.left + 10)
        .attr("y", -25)
        .attr("text-anchor", "start")
        .attr("fill", "black")
        .style("font-size", "14px")
        .text("Labeled Energy Consumption (kWh/year)");

    // Legend (top right)
    const legend = chart.append("g")
        .attr("transform", `translate(${innerWidth - 70}, 0)`);

    const legendItem = legend.selectAll("g")
        .data(colourScale.domain())
        .join("g")
        .attr("transform", (d, i) => `translate(0, ${i * 24})`);

    legendItem.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => colourScale(d));

    legendItem.append("text")
        .attr("x", 20)
        .attr("y", 11)
        .style("font-size", "14px")
        .text(d => d);

    console.log("Scatterplot created successfully");
}