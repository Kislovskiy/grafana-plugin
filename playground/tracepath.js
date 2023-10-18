"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Graph = /** @class */ (function () {
    function Graph() {
        this.adjacencyList = new Map();
    }
    Graph.prototype.addVertex = function (vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    };
    Graph.prototype.addEdge = function (startVertex, endVertex) {
        if (this.adjacencyList.has(startVertex) && this.adjacencyList.has(endVertex)) {
            this.adjacencyList.get(startVertex).push(endVertex);
        }
    };
    Graph.prototype.depthFirstTraversal = function (startNode, endNode) {
        var visited = new Set();
        var paths = [];
        this.dfsRecursive(startNode, endNode, visited, [startNode], paths);
        return paths;
    };
    Graph.prototype.dfsRecursive = function (currentNode, endNode, visited, currentPath, paths) {
        visited.add(currentNode);
        if (currentNode === endNode) {
            paths.push(__spreadArray([], currentPath, true));
        }
        else {
            for (var _i = 0, _a = this.adjacencyList.get(currentNode) || []; _i < _a.length; _i++) {
                var neighbor = _a[_i];
                if (!visited.has(neighbor)) {
                    currentPath.push(neighbor);
                    this.dfsRecursive(neighbor, endNode, visited, currentPath, paths);
                    currentPath.pop();
                }
            }
        }
        visited.delete(currentNode);
    };
    Graph.prototype.getGraphData = function () {
        var nodes = Array.from(this.adjacencyList.keys()).map(function (node) { return ({ id: node }); });
        var links = [];
        for (var _i = 0, _a = this.adjacencyList.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], source = _b[0], targets = _b[1];
            for (var _c = 0, targets_1 = targets; _c < targets_1.length; _c++) {
                var target = targets_1[_c];
                links.push({ source: source, target: target });
            }
        }
        return { nodes: nodes, links: links };
    };
    return Graph;
}());
function plotGraph(graph) {
    var graphData = graph.getGraphData();
    var width = 400;
    var height = 300;
    var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);
    d3.forceSimulation()
        .force('link', d3.forceLink().id(function (d) { return d.id; }))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));
    var link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graphData.links)
        .enter().append('line')
        .attr('stroke-width', 2);
    var node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(graphData.nodes)
        .enter().append('circle')
        .attr('r', 10);
    // simulation
    //     .nodes(graphData.nodes)
    //     .on('tick', ticked);
    // simulation.force('link')
    //     .links(graphData.links);
    function ticked() {
        link
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y; });
        node
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });
    }
}
// Example usage:
var graph = new Graph();
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
var sourceNode = 0;
var destinationNode = 4;
var paths = graph.depthFirstTraversal(sourceNode, destinationNode);
console.log("All paths from ".concat(sourceNode, " to ").concat(destinationNode, ":"));
for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
    var path = paths_1[_i];
    console.log(path.join(' -> '));
}
plotGraph(graph);
