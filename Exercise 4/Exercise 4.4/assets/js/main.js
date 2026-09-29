// Load TV brand data
d3.csv("../data/tvBrandCount.csv", d => {
    return {
        brand: d.brand,
        count: +d.count
    };

}).then(data => {

    // Show the data in the console
    console.log(data);

    // Number of records
    console.log("Number of brands:", data.length);

    // Maximum count
    console.log("Maximum count:", d3.max(data, d => d.count));

    // Minimum count
    console.log("Minimum count:", d3.min(data, d => d.count));

    // Minimum and maximum
    console.log("Extent:", d3.extent(data, d => d.count));

    // Sort from highest to lowest
    data.sort((a, b) => b.count - a.count);

    console.log("Sorted data:", data);

    // Send data to the bar chart function
    drawBarChart(data);
});