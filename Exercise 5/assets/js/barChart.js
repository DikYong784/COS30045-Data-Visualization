const drawBarChart = data => {

    const width = 700;
    const height = 500;

    const margin = { top: 40, right: 30, bottom: 80, left: 80 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");

    // Inner chart
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X scale
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.screenType))
        .range([0, chartWidth])
        .padding(0.2);

    // Y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.energy)])
        .nice()
        .range([chartHeight, 0]);

    // X axis (tick marks removed)
    innerChart.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .selectAll("text")
        .style("font-size", "13px");

    // Y axis
    innerChart.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("font-size", "12px");

    // Y axis label
    innerChart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -chartHeight / 2)
        .attr("y", -55)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Average Energy Consumption");

    // X axis label
    innerChart.append("text")
        .attr("x", chartWidth / 2)
        .attr("y", chartHeight + 60)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Screen Type");

    // Bars
    innerChart.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.screenType))
        .attr("y", d => yScale(d.energy))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d.energy))
        .attr("fill", "steelblue");

    // Values above bars
    innerChart.selectAll(".bar-value")
        .data(data)
        .join("text")
        .attr("class", "bar-value")
        .attr("x", d => xScale(d.screenType) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.energy) - 8)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => d.energy.toFixed(1));
};

// Load Exercise 5.1 data
d3.csv("data/Data_exercise 5.1-1.csv").then(raw => {

    // Check these in the console: they show your real column names
    console.log("Columns:", raw.columns);
    console.log("Raw rows:", raw);

    // Use the first column as category, the second as the number
    const [catCol, valCol] = raw.columns;

    const data = raw.map(d => ({
        screenType: d[catCol],
        energy: +d[valCol]
    }));

    console.log("Cleaned data:", data);

    // Sort from highest to lowest
    data.sort((a, b) => b.energy - a.energy);

    drawBarChart(data);
});