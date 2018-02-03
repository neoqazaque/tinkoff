onmessage = (event) => {
    let { data } = event.data;
    const chunks = splitIntoChunks(data);
    postMessage({ chunks });
}

function splitIntoChunks(data) {
    const monthsInYear = 12;
    const chunks = [];
    const ratio = Math.ceil(data.length / monthsInYear);
    for (let i = 0; i < monthsInYear; i++) {
        const chunk = data.slice(ratio * i, ratio * (i + 1));
        const avgChunk = chunk.reduce((acc, el) => {
            acc += el.v;
            return acc;
        }, 0) / chunk.length;
        chunks.push(avgChunk);
    }
    return chunks;

}