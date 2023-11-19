const correlationId: number[] = [2, 2, 2, 2, 2, 2, 2, 2];
const hops: string[] = ["hop_a", "hop_b", "hop_c", "hop_d", "hop_a", "hop_k", "hop_c", "hop_d"];
const latency: number[] = [0.1, 0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0.4];
const loss: number[] = [0, 0.1, 0, 0, 0.5, 0, 0, 0];
const numbers: string[] = ["a", "b", "c", "d", "a", "b", "c", "d"];
const destinaton: string[] = ["hop_d", "hop_d", "hop_d", "hop_d", "hop_d", "hop_d", "hop_d", "hop_d"];

const graph: Record<string, Record<string, { latency: number[], loss: number[] }>> = {};

for (let i = 0; i < hops.length; i++) {
    const number = numbers[i];
    const hop = hops[i];
    const latencyValue = latency[i];
    const lossValue = loss[i];

    if (number in graph) {
        if (hop in graph[number]) {
            graph[number][hop].latency.push(latencyValue);
            graph[number][hop].loss.push(lossValue);
        } else {
            graph[number][hop] = { latency: [latencyValue], loss: [lossValue] };
        }
    } else {
        graph[number] = { [hop]: { latency: [latencyValue], loss: [lossValue] } };
    }
}

for (const hopNumber in graph) {
    for (const hopHost in graph[hopNumber]) {
        const latencySum = graph[hopNumber][hopHost].latency.reduce((a, b) => a + b, 0);
        const lossSum = graph[hopNumber][hopHost].loss.reduce((a, b) => a + b, 0);
        const latencyAverage = latencySum / graph[hopNumber][hopHost].latency.length;
        const lossAverage = lossSum / graph[hopNumber][hopHost].loss.length;
        console.log(`${hopNumber} ${hopHost} ${latencyAverage} ${lossAverage}%`);
    }
}
