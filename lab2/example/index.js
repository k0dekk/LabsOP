/**
 * Usage examples for generators-lib
 * Run: npm install && node index.js
 */

const { fibonacciGenerator, runWithTimeout } = require("generators-lib");

console.log("=== Fibonacci Generator (0.5 sec) ===");
runWithTimeout(fibonacciGenerator(), 0.5);
