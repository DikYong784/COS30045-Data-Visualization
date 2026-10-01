function drawHistogram(data) {

    // Remove old chart
    d3.select("#histogram")
        .selectAll("*")
        .remove();


    // ==========================================
    // CREATE SVG
    // ==========================================

    const svg =
        d3.select("#histogram")
            .append("svg")
            .attr(
                "viewBox",
                `0 0 ${width} ${height}`
            );


    // ==========================================
    // INNER CHART
    // ==========================================

    const innerChart =
        svg.append("g")
            .attr(
                "transform",
                `translate(
                    ${margin.left},
                    ${margin.top}
                )`
            );


    // ==========================================
    // CREATE BINS
    // ==========================================

    const bins = binGenerator(data);

    console.log("Bins:");
    console.log(bins);


    // ==========================================
    // X SCALE DOMAIN
    // ==========================================

    const xMin =
        bins.length > 0
            ? bins[0].x0
            : 0;

    const xMax =
        bins.length > 0
            ? bins[bins.length - 1].x1
            : 100;


    xScale
        .domain([xMin, xMax])
        .range([0, innerWidth]);


    // ==========================================
    // Y SCALE DOMAIN
    // ==========================================

    const binsMaxLength =
        d3.max(
            bins,
            d => d.length
        ) || 1;


    yScale
        .domain([0, binsMaxLength])
        .nice()
        .range([innerHeight, 0]);


    // ==========================================
    // DRAW BARS
    // ==========================================

    innerChart
        .selectAll(".bar")
        .data(bins)
        .join("rect")
        .attr("class", "bar")
        .attr(
            "x",
            d => xScale(d.x0) + 1
        )
        .attr(
            "y",
            d => yScale(d.length)
        )
        .attr(
            "width",
            d =>
                Math.max(
                    0,
                    xScale(d.x1) -
                    xScale(d.x0) -
                    2
                )
        )
        .attr(
            "height",
            d =>
                innerHeight -
                yScale(d.length)
        );


    // ==========================================
    // X AXIS
    // ==========================================

    innerChart
        .append("g")
        .attr(
            "class",
            "axis"
        )
        .attr(
            "transform",
            `translate(
                0,
                ${innerHeight}
            )`
        )
        .call(
            d3.axisBottom(xScale)
        );


    // ==========================================
    // Y AXIS
    // ==========================================

    innerChart
        .append("g")
        .attr(
            "class",
            "axis"
        )
        .call(
            d3.axisLeft(yScale)
        );


    // ==========================================
    // X AXIS LABEL
    // ==========================================

    innerChart
        .append("text")
        .attr(
            "class",
            "axis-label"
        )
        .attr(
            "x",
            innerWidth / 2
        )
        .attr(
            "y",
            innerHeight + 60
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text(
            "Energy Consumption"
        );


    // ==========================================
    // Y AXIS LABEL
    // ==========================================

    innerChart
        .append("text")
        .attr(
            "class",
            "axis-label"
        )
        .attr(
            "transform",
            "rotate(-90)"
        )
        .attr(
            "x",
            -innerHeight / 2
        )
        .attr(
            "y",
            -60
        )
        .attr(
            "text-anchor",
            "middle"
        )
        .text(
            "Number of TVs"
        );

}