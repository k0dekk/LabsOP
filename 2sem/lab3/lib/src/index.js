/**
 * generators-lib - Main entry point (Lab 3: + memoization)
 */

const generators = require("./generators");
const { runWithTimeout } = require("./timeoutIterator");
const { memoize, EVICTION } = require("./memoize");

module.exports = {
  ...generators,
  runWithTimeout,
  memoize,
  EVICTION,
};
