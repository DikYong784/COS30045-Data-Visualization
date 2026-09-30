// Finds the first column whose name contains one of the keywords
const findCol = (columns, keywords) => {
  for (const k of keywords) {
    const hit = columns.find(c => c.toLowerCase().includes(k));
    if (hit) return hit;
  }
  return undefined;
};

// Shows a problem on the page as well as in the console
const showError = msg => {
  console.error(msg);
  d3.select("#histogram")
    .append("p")
    .style("color", "#c8102e")
    .style("font-weight", "bold")
    .text(msg);
};

d3.text("data/W6_TVdata.csv").then(text => {

  // Remove a BOM and detect , or ; as the delimiter
  text = text.replace(/^\uFEFF/, "");
  const delimiter = text.split("\n")[0].includes(";") ? ";" : ",";
  const raw = d3.dsvFormat(delimiter).parse(text);

  console.log("Delimiter:", delimiter);
  console.log("Columns:", raw.columns);

  const cols = raw.columns;
  const brandCol  = findCol(cols, ["brand"]);
  const modelCol  = findCol(cols, ["model"]);
  const starCol   = findCol(cols, ["star2", "star"]);
  const energyCol = findCol(cols, ["energy"]);
  const techCol   = findCol(cols, ["tech", "type"]);
  const sizeCol   = findCol(cols, ["size"]);

  console.log("Using columns:", { brandCol, modelCol, starCol, energyCol, techCol, sizeCol });

  if (!energyCol || !starCol) {
    showError("Could not find the energy or star column. Columns are: " + cols.join(", "));
    return;
  }

  const data = raw
    .map(d => ({
      brand: d[brandCol],
      model: d[modelCol],
      star: +d[starCol],
      energyConsumption: +d[energyCol],
      screenTech: (d[techCol] || "").trim(),
      screenSize: +d[sizeCol]
    }))
    .filter(d => !isNaN(d.energyConsumption) && !isNaN(d.star));

  console.log("Cleaned data:", data.length, "rows", data);

  if (data.length === 0) {
    showError("No valid rows after cleaning. Check the energy and star columns hold numbers.");
    return;
  }

  drawHistogram(data);
  populateFilters(data);
  drawScatterplot(data);
  createTooltip();
  handleMouseEvents();
})
.catch(err => showError("Could not load data/W6_TVdata.csv. Check the file name, the folder and that you are using a local server. (" + err.message + ")"));