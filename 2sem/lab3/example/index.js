/**
 * Lab 3 Example: Generators + Memoization
 * Run: npm install && node index.js
 */

const { fibonacciGenerator, runWithTimeout, memoize } = require("generators-lib");

console.log("=== Fibonacci (0.5 sec) ===\n");
runWithTimeout(fibonacciGenerator(), 0.5);

console.log("\n=== Memoization ===\n");

// Heavy computation for demo (recursive calls use memoized version)
const memoizedFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoizedFib(n - 1) + memoizedFib(n - 2);
}, { maxSize: 50, eviction: "LRU" });

console.log("Memoized Fibonacci (LRU, maxSize=50):");
console.time("first fib(35)");
const a = memoizedFib(35);
console.timeEnd("first fib(35)");

console.time("cached fib(35)");
const b = memoizedFib(35);
console.timeEnd("cached fib(35)");

console.log(`fib(35) = ${a}, cached = ${b}, same: ${a === b}\n`);

// LFU demo
function expensive(x) {
  return x * 2;
}
const memoLFU = memoize(expensive, { maxSize: 3, eviction: "LFU" });
console.log("LFU (maxSize=3):", memoLFU(1), memoLFU(2), memoLFU(3));
memoLFU(1);
memoLFU(1);
memoLFU(2);
console.log("After 1,1,2 - 3 is evicted, memoLFU(3) recomputes:", memoLFU(3), "\n");

// Custom eviction
const memoCustom = memoize((x) => x ** 2, {
  maxSize: 5,
  eviction: (cache, max) => {
    const keys = [...cache.keys()];
    if (keys.length > max) cache.delete(keys[0]);
  },
});
console.log("Custom eviction (FIFO):", [1, 2, 3, 4, 5, 6].map((n) => memoCustom(n)));
console.log("Cache hit for 1:", memoCustom(1));
