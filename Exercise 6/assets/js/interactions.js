// ==========================================
// FILTER INFORMATION
// ==========================================

const filters = [

    {
        id: "all",
        label: "All TVs",
        isActive: true
    },

    {
        id: "LCD",
        label: "LCD",
        isActive: false
    },

    {
        id: "LED",
        label: "LED",
        isActive: false
    },

    {
        id: "OLED",
        label: "OLED",
        isActive: false
    }

];


// ==========================================
// POPULATE FILTERS
// ==========================================

function populateFilters(data) {

    d3.select("#filters_screen")
        .selectAll("button")
        .data(filters)
        .join("button")
        .attr(
            "class",
            "filter-button"
        )
        .classed(
            "active",
            d => d.isActive
        )
        .text(
            d => d.label
        )
        .on(
            "click",
            function(event, d) {

                console.log(
                    "Clicked:",
                    d.id
                );


                // ==================================
                // ALL BUTTON
                // ==================================

                if (d.id === "all") {

                    filters.forEach(
                        filter => {
                            filter.isActive =
                                filter.id === "all";
                        }
                    );

                }

                // ==================================
                // OTHER FILTERS
                // ==================================

                else {

                    d.isActive =
                        !d.isActive;


                    const anyActive =
                        filters
                            .filter(
                                filter =>
                                    filter.id !== "all"
                            )
                            .some(
                                filter =>
                                    filter.isActive
                            );


                    if (anyActive) {

                        filters
                            .find(
                                filter =>
                                    filter.id === "all"
                            )
                            .isActive = false;

                    }
                    else {

                        filters
                            .find(
                                filter =>
                                    filter.id === "all"
                            )
                            .isActive = true;

                    }

                }


                // ==================================
                // UPDATE BUTTON STYLE
                // ==================================

                d3.select("#filters_screen")
                    .selectAll("button")
                    .classed(
                        "active",
                        filter =>
                            filter.isActive
                    );


                // ==================================
                // FILTER DATA
                // ==================================

                let updatedData;


                const allActive =
                    filters.find(
                        filter =>
                            filter.id === "all"
                    ).isActive;


                if (allActive) {

                    updatedData = data;

                }
                else {

                    const activeFilters =
                        filters
                            .filter(
                                filter =>
                                    filter.isActive
                            )
                            .map(
                                filter =>
                                    filter.id
                            );


                    updatedData =
                        data.filter(
                            item =>
                                activeFilters.includes(
                                    item.screenTechnology
                                )
                        );

                }


                console.log(
                    "Updated data:",
                    updatedData
                );


                // ==================================
                // REDRAW HISTOGRAM
                // ==================================

                drawHistogram(updatedData);

            }
        );

}


// ==========================================
// TOOLTIP (ADDED)
// ==========================================

const createTooltip = () => {

    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 6)
        .attr("fill", "steelblue")
        .attr("opacity", 0.9);

    const text = tooltip.append("text")
        .style("fill", "white")
        .style("font-size", "12px");

    text.append("tspan").attr("class", "tt-brand").attr("x", 10).attr("y", 20).style("font-weight", "bold");
    text.append("tspan").attr("class", "tt-model").attr("x", 10).attr("y", 37);
    text.append("tspan").attr("class", "tt-size").attr("x", 10).attr("y", 54);
};


// ==========================================
// MOUSE EVENTS (ADDED)
// ==========================================

const handleMouseEvents = () => {

    const tooltip = innerChartS.select(".tooltip");
    const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s || "");

    innerChartS.selectAll(".dot")
        .on("mouseenter", (e, d) => {
            console.log("hover", d);

            tooltip.select(".tt-brand").text(clip(d.brand, 24));
            tooltip.select(".tt-model").text(clip(d.model, 26));
            tooltip.select(".tt-size").text(
                d.screenSize ? `Screen size: ${d.screenSize}"` : `Energy: ${d.energyConsumption}`
            );

            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            const x = Math.max(0, Math.min(cx - tooltipWidth / 2, innerChartWidth - tooltipWidth));
            const y = cy - tooltipHeight - 10 < 0 ? cy + 10 : cy - tooltipHeight - 10;

            tooltip
                .attr("transform", `translate(${x}, ${y})`)
                .raise()
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            tooltip.style("opacity", 0);
        });
};