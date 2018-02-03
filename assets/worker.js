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

// function groupByMonth(data) {
//      // if (precision === 'month') {
//     //     data = groupByMonth(data);
//     // } else if (precision === 'year') {
//     //     data = groupByYear(data);
//     // }
//     // if (precision !== 'day') {
//     //     data = data.map(array => {
//     //         if (filter === 'avg') {
//     //             return d3.mean(array, getData);
//     //         } else if (filter === 'max') {
//     //             return d3.max(array, getData);
//     //         } else if (filter === 'min') {
//     //             return d3.min(array, getData);
//     //         }
//     //     });
//     // }
//     // return data;
//     const firstYear = new Date(data[0].t).getFullYear();
//     return data.reduce((acc, item) => {
//         const monthsInYear = 12;
//         const date = new Date(item.t);
//         const month = date.getMonth();
//         const year = date.getFullYear();
//         const monthOffset = (year - firstYear) * monthsInYear;
//         const index = monthOffset + month;
//         if (!Array.isArray(acc[index])) {
//             acc[index] = [];
//         }
//         acc[index].push(item);
//         return acc;
//     }, []);
// }


// function groupByYear(data) {
//     const firstYear = new Date(data[0].t).getFullYear();
//     return data.reduce((acc, item) => {
//         const date = new Date(item.t);
//         const index = date.getFullYear() - firstYear;
//         if (!Array.isArray(acc[index])) {
//             acc[index] = [];
//         }
//         acc[index].push(item);
//         return acc;
//     }, []);
// }


// function getData(data) {
//     if (typeof data === 'object' && data.hasOwnProperty('v')) {
//         return data.v;
//     }
//     return data;
// }