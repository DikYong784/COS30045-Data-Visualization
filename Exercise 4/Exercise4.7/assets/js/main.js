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
    // 100px is reserved for the brand labels
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([100, 400]);


    // Y scale for TV brands
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 800])
        .padding(0);


    // Create a group for each brand
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr(
            "transform",
            d => `translate(0, ${yScale(d.brand)})`
        );


    // Add the bars
    barAndLabel
        .append("rect")
        .attr("class", d => `count-${d.count}`)
        .attr("width", d => xScale(d.count) - 100)
        .attr("height", yScale.bandwidth())
        .attr("x", 100)
        .attr("y", 0)
        .attr("fill", "steelblue");


    // Add the brand labels
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 90)
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "13px");


    // Add the count values
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => xScale(d.count) + 5)
        .attr("y", 15)
        .style("font-size", "13px");

};


// Load TV brand data
d3.csv("data/tvBrandCount.csv", d => {

    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Show the data in console
    console.log(data);

    // Number of records
    console.log(
        "Number of brands:",
        data.length
    );

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