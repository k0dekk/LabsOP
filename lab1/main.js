/**
 * Lab 1: Generators and Iterators
 */

const { fibonacciGenerator } = require("./fibonacciGenerator");

// ============== TIMEOUT ITERATOR ==============

/**
 * Consumes an iterator for a limited time (timeout in seconds)
 * @param {Iterator} iterator - Any iterable/iterator
 * @param {number} timeoutSeconds - Duration in seconds
 * @param {(value: any) => void} [processor] - Optional custom processor. Default: prints value
 */
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

// ============== DEMO ==============

console.log("=== Fibonacci (0.5 sec) ===");
runWithTimeout(fibonacciGenerator(), 0.5);
