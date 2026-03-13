const { fibonacciGenerator, runWithTimeout } = require("generators-lib");

console.log("0.01 Fibonacci Generator");
runWithTimeout(fibonacciGenerator(), 0.01);
