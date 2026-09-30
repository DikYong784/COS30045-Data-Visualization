// ---------- Chart dimensions (used by the Week 6 charts) ----------
const width = 700;
const height = 500;
const margin = { top: 40, right: 30, bottom: 80, left: 80 };
const innerChartWidth = width - margin.left - margin.right;
const innerChartHeight = height - margin.top - margin.bottom;

// ---------- Colours ----------
// bodyBackgroundColor should match the svg background (makes the gaps between bars)
const bodyBackgroundColor = "#ffffff";
const barColor = "steelblue";

// ---------- Data limits ----------
// One TV has extremely high energy consumption. Both Week 6 charts leave it out.
const maxEnergy = 1800;

// ---------- Histogram (6.1 / 6.2) ----------
let innerChart;                 // set in histogram.js
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// 100-unit bins from 0 to maxEnergy. Fixed bins keep the x-axis stable when filtering.
const binGenerator = d3.bin()
  .value(d => d.energyConsumption)
  .domain([0, maxEnergy])
  .thresholds(d3.range(100, maxEnergy, 100));

// Filter buttons: id, label and starting state
const filters_screen = [
  { id: "all",  label: "All",  isActive: true  },
  { id: "LCD",  label: "LCD",  isActive: false },
  { id: "LED",  label: "LED",  isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// ---------- Scatterplot (6.3 / 6.4) ----------
let innerChartS;                // set in scatterplot.js
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

const tooltipWidth = 170;
const tooltipHeight = 62;
