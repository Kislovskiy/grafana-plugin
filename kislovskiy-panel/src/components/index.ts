// import * as d3 from 'd3';

// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv"
).then(function (csvdata) {
    // Add X axis
    const x = d3.scaleLinear().domain([3, 9]).range([0, width]);
    svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

  // Add dots
    svg
        .append("g")
        .selectAll("circle")
        .data(csvdata)
        .join("circle")
        .attr("cx", function (d) {
            return x(Number(d.Sepal_Length));
        })
        .attr("cy", function (d) {
            return y(Number(d.Petal_Length));
        })
        .attr("r", 5);

    function popCircle() {
        csvdata.pop();

    svg
        .selectAll("circle")
        .data(csvdata)
        .attr("cx", function (d) {
            return x(Number(d.Sepal_Length));
        })
        .attr("cy", function (d) {
            return y(Number(d.Petal_Length));
        })
        .exit()
        .transition()
        .attr("r", 0)
        .remove();
    }

    // Add an event listener to the button created in the html part
    d3.select("#popCircle").on("click", popCircle);
});