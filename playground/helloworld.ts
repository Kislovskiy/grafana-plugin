import * as d3 from "d3";

const svg = d3.select("body").append("svg")
    .attr("width", 400)
    .attr("height", 200);

svg.append("text")
    .attr("x", 100)
    .attr("y", 100)
    .text("Hello, World!")
    .style("font-size", "24px")
    .style("fill", "blue");
