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