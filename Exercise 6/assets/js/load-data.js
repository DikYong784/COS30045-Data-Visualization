d3.csv("data/W6_TVdata.csv", d => {

    return {
        brand: d.brand,
        model: d.model,
        star2: +d.star,
        energyConsumption: +d.energyConsumption,
        screenTechnology: d.screenTech
    };

}).then(data => {

    console.log("Data loaded:");
    console.log(data);

    console.log("Number of records:");
    console.log(data.length);

    console.log("Maximum energy:");
    console.log(
        d3.max(data, d => d.energyConsumption)
    );

    console.log("Minimum energy:");
    console.log(
        d3.min(data, d => d.energyConsumption)
    );

    console.log("Energy extent:");
    console.log(
        d3.extent(
            data,
            d => d.energyConsumption
        )
    );

    // Draw histogram
    drawHistogram(data);

    // Create filters
    populateFilters(data);

    drawScatterplot(data);

});