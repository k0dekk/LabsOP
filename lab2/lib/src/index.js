/**
 * generators-lib - Main entry point
 */

const generators = require("./generators");
const { runWithTimeout } = require("./timeoutIterator");

module.exports = {
  ...generators,
  runWithTimeout,
};
