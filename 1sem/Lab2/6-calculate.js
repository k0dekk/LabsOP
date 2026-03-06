'use strict'

function average(a, b) {
    return (a + b) / 2;
}

function square(x) {
    return x * x;
}

function cube(x) {
    return x * x * x;
}

function calculate() {
    const results = [];
    for (let i = 0; i <= 9;) {
        const kvadrat = square(i);
        const kub = cube(i);
        const avg = average(kvadrat, kub);
        results.push(avg);
        i++;
    }
    return results;
}

console.log(calculate());
