/**
 * Fibonacci Sequence Generator - yields next number endlessly
 */
function* fibonacciGenerator() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

module.exports = { fibonacciGenerator };
