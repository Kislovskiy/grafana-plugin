var _a;
var correlationId = [2, 2, 2, 2, 2, 2, 2, 2];
var hops = ["hop_a", "hop_b", "hop_c", "hop_d", "hop_a", "hop_k", "hop_c", "hop_d"];
var latency = [0.1, 0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0.4];
var loss = [0, 0.1, 0, 0, 0.5, 0, 0, 0];
var numbers = ["a", "b", "c", "d", "a", "b", "c", "d"];
var destinaton = ["hop_d", "hop_d", "hop_d", "hop_d", "hop_d", "hop_d", "hop_d", "hop_d"];
var graph = {};
for (var i = 0; i < hops.length; i++) {
    var number = numbers[i];
    var hop = hops[i];
    var latencyValue = latency[i];
    var lossValue = loss[i];
    if (number in graph) {
        if (hop in graph[number]) {
            graph[number][hop].latency.push(latencyValue);
            graph[number][hop].loss.push(lossValue);
        }
        else {
            graph[number][hop] = { latency: [latencyValue], loss: [lossValue] };
        }
    }
    else {
        graph[number] = (_a = {}, _a[hop] = { latency: [latencyValue], loss: [lossValue] }, _a);
    }
}
for (var hopNumber in graph) {
    for (var hopHost in graph[hopNumber]) {
        var latencySum = graph[hopNumber][hopHost].latency.reduce(function (a, b) { return a + b; }, 0);
        var lossSum = graph[hopNumber][hopHost].loss.reduce(function (a, b) { return a + b; }, 0);
        var latencyAverage = latencySum / graph[hopNumber][hopHost].latency.length;
        var lossAverage = lossSum / graph[hopNumber][hopHost].loss.length;
        console.log("".concat(hopNumber, " ").concat(hopHost, " ").concat(latencyAverage, " ").concat(lossAverage, "%"));
    }
}
