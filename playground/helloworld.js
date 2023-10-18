"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var svg = d3.select("body").append("svg")
    .attr("width", 400)
    .attr("height", 200);
svg.append("text")
    .attr("x", 100)
    .attr("y", 100)
    .text("Hello, World!")
    .style("font-size", "24px")
    .style("fill", "blue");
