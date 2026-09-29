// Select the responsive SVG container
const container = d3.select(".responsive-svg-container");

// Create the SVG
const svg = container
    .append("svg")
    .attr("viewBox", "0 0 500 800")
    .style("border", "1px solid black");


// Draw the bar chart
const drawBarChart = data => {

    // X scale for TV count
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);


    // Y scale for TV brands
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 800])
        .padding(0.02);


    // Create rectangles
    svg
        .selectAll("rect")
        .data(data)
        .join("rect")

        // Class based on count
        .attr("class", d => `count-${d.count}`)

        // Width calculated using xScale
        .attr("width", d => xScale(d.count))

        // Height calculated using yScale
        .attr("height", yScale.bandwidth())

        // Start at x = 0
        .attr("x", 0)

        // Position using the brand
        .attr("y", d => yScale(d.brand))

        // Bar colour
        .attr("fill", "steelblue");
};


// Load TV brand data
d3.csv("data/tvBrandCount.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Show data in console
    console.log(data);

    // Number of records
    console.log("Number of brands:", data.length);

    // Maximum count
    console.log(
        "Maximum count:",
        d3.max(data, d => d.count)
    );

    // Minimum count
    console.log(
        "Minimum count:",
        d3.min(data, d => d.count)
    );

    // Minimum and maximum
    console.log(
        "Extent:",
        d3.extent(data, d => d.count)
    );

    // Sort from highest to lowest
    data.sort((a, b) => b.count - a.count);

    console.log("Sorted data:", data);

    // Draw the chart
    drawBarChart(data);

});