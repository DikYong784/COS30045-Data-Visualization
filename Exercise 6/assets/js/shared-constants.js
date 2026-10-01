// ==========================================
// HISTOGRAM DIMENSIONS
// ==========================================

const width = 1000;
const height = 550;

const margin = {
    top: 40,
    right: 40,
    bottom: 80,
    left: 90
};

const innerWidth =
    width - margin.left - margin.right;

const innerHeight =
    height - margin.top - margin.bottom;


// ==========================================
// COLOURS
// ==========================================

const bodyBackgroundColor = "#ffffff";

const barColor = "#2563eb";


// ==========================================
// SCALES
// ==========================================

const xScale = d3.scaleLinear();

const yScale = d3.scaleLinear();


// ==========================================
// BIN GENERATOR
// ==========================================

const binGenerator = d3.bin()
    .value(d => d.energyConsumption)
    .thresholds(14);