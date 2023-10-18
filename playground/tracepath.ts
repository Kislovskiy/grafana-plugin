import * as d3 from "d3";

class Graph {
    adjacencyList: Map<number, number[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: number) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(startVertex: number, endVertex: number) {
        if (this.adjacencyList.has(startVertex) && this.adjacencyList.has(endVertex)) {
            this.adjacencyList.get(startVertex)!.push(endVertex);
        }
    }

    depthFirstTraversal(startNode: number, endNode: number) {
        const visited: Set<number> = new Set();
        const paths: number[][] = [];
        this.dfsRecursive(startNode, endNode, visited, [startNode], paths);
        return paths;
    }

    private dfsRecursive(
        currentNode: number,
        endNode: number,
        visited: Set<number>,
        currentPath: number[],
        paths: number[][]
    ) {
        visited.add(currentNode);

        if (currentNode === endNode) {
        paths.push([...currentPath]);
        } else {
        for (const neighbor of this.adjacencyList.get(currentNode) || []) {
            if (!visited.has(neighbor)) {
                currentPath.push(neighbor);
                this.dfsRecursive(neighbor, endNode, visited, currentPath, paths);
                currentPath.pop();
            }
        }
        }

        visited.delete(currentNode);
    }

    getGraphData() {
        const nodes = Array.from(this.adjacencyList.keys()).map(node => ({ id: node }));
        const links: { source: number; target: number }[] = [];
        for (const [source, targets] of this.adjacencyList.entries()) {
            for (const target of targets) {
            links.push({ source, target });
            }
        }
        return { nodes, links };
    }
}

function plotGraph(graph: Graph) {
    const graphData = graph.getGraphData();
    const width = 400;
    const height = 300;

    const svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

    d3.forceSimulation()
        .force('link', d3.forceLink().id((d: any) => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graphData.links)
        .enter().append('line')
        .attr('stroke-width', 2);

    const node = svg.append('g')
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
            .attr('x1', (d: any) => d.source.x)
            .attr('y1', (d: any) => d.source.y)
            .attr('x2', (d: any) => d.target.x)
            .attr('y2', (d: any) => d.target.y);

        node
            .attr('cx', (d: any) => d.x)
            .attr('cy', (d: any) => d.y);
        }
}

// Example usage:
const graph = new Graph();
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

const sourceNode = 0;
const destinationNode = 4;
const paths = graph.depthFirstTraversal(sourceNode, destinationNode);

console.log(`All paths from ${sourceNode} to ${destinationNode}:`);
for (const path of paths) {
    console.log(path.join(' -> '));
}

plotGraph(graph)
