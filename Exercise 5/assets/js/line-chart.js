const drawLineChart = data => {

    const width = 700;
    const height = 500;

    const margin = {
        top: 40,
        right: 30,
        bottom: 80,
        left: 80
    };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;


    // Create SVG
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");


    // Inner chart
    const innerChart = svg.append("g")
        .attr(
            "transform",
            `translate(${margin.left}, ${margin.top})`
        );


    // X scale
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, chartWidth]);


    // Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .nice()
        .range([chartHeight, 0]);


    // X axis
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));


    // Y axis
    const yAxis = d3.axisLeft(yScale);


    // Add X axis
    innerChart.append("g")
        .attr(
            "transform",
            `translate(0, ${chartHeight})`
        )
        .call(xAxis);


    // Add Y axis
    innerChart.append("g")
        .call(yAxis);


    // Y axis label
    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Average Price ($/MWh)");


    // X axis label
    innerChart.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Year");


    // Scatter plot circles
    innerChart.selectAll(".point")
        .data(data)
        .join("circle")
        .attr("class", "point")
        .attr("r", 4)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.averagePrice))
        .attr("fill", "steelblue");


    // Line generator
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice));


    // Draw line
    innerChart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
};


d3.csv("data/ARE_Spot_Prices.csv").then(raw => {

    // Check these in the console: they show your real headers
    console.log("Columns:", raw.columns);
    console.log("Raw rows:", raw);

    const yearCol = raw.columns[0];
    const avgCol = raw.columns[raw.columns.length - 1];

    // Strip $ and commas in case values are formatted as text
    const toNum = v => +String(v).replace(/[$,\s]/g, "");

    const data = raw
        .map(d => ({
            year: toNum(d[yearCol]),
            averagePrice: toNum(d[avgCol])
        }))
        // drop blank or invalid rows
        .filter(d => !isNaN(d.year) && !isNaN(d.averagePrice) && d[avgCol] !== "");

    console.log("Cleaned data:", data);

    data.sort((a, b) => a.year - b.year);

    drawLineChart(data);
});