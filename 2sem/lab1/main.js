const { fibonacciGenerator } = require('./fibonacciGenerator');

function runWithTimeout(iterator, timeoutSeconds, processor) {
  const endTime = Date.now() + timeoutSeconds * 1000;
  let count = 0;
  let total = 0;

  const processValue = processor || ((val) => console.log(val));

  for (const value of iterator) {
    if (Date.now() >= endTime) break;

    processValue(value);
    count++;

    if (typeof value === "number") {
      total += value;
    }
  }

  if (count > 0 && typeof total === "number" && total > 0) {
    console.log(`\n--- Summary: count=${count}, total=${total}, avg=${(total / count).toFixed(2)} ---`);
  }

  return count;
}

console.log("0.01 sec Fibonacci");
runWithTimeout(fibonacciGenerator(), 0.01);