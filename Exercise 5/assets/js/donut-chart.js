const drawDonutChart = data => {

    const width = 700;
    const height = 500;

    // Find radius
    const radius =
        Math.min(width, height) / 2 - 40;


    // Colour scale
    const colourScale = d3.scaleOrdinal()
        .domain(data.map(d => d.size))
        .range([
            "steelblue",
            "orange",
            "seagreen"
        ]);


    // Pie function
    const pie = d3.pie()
        .value(d => d.count)
        .sort(null);


    // Arc generator
    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius);


    // Create SVG
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black");


    // Move chart to centre
    const innerChart = svg.append("g")
        .attr(
            "transform",
            `translate(${width / 2}, ${height / 2})`
        );


    // Draw arcs
    innerChart.selectAll(".arc")
        .data(pie(data))
        .join("path")
        .attr("class", "arc")
        .attr("d", arcGenerator)
        .attr("fill", d => colourScale(d.data.size));


    // Add labels
    innerChart.selectAll(".label")
        .data(pie(data))
        .join("text")
        .attr("class", "label")
        .attr(
            "transform",
            d => `translate(${arcGenerator.centroid(d)})`
        )
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text(d => d.data.size);
};


d3.csv("data/Data_exercise 5.3.csv").then(raw => {

    // Check these in the console: they show your real headers
    console.log("Columns:", raw.columns);
    console.log("Raw rows:", raw);

    const catCol = raw.columns[0];
    const valCol = raw.columns[raw.columns.length - 1];

    const toNum = v => +String(v).replace(/[$,\s]/g, "");

    const data = raw
        .map(d => ({
            size: d[catCol],
            count: toNum(d[valCol])
        }))
        .filter(d => d.size && !isNaN(d.count));

    console.log("Cleaned data:", data);

    drawDonutChart(data);
});