/**
 * Timeout Iterator - consumes an iterator for a limited time
 */

function runWithTimeout(iterable, timeoutSeconds, processor) {
  const iterator = iterable[Symbol.iterator] ? iterable[Symbol.iterator]() : iterable;
  const endTime = Date.now() + timeoutSeconds * 1000;
  let count = 0;
  let total = 0;

  const processValue = processor || ((val) => console.log(val));

  while (true) {
    if (Date.now() >= endTime) break;

    const result = iterator.next();
    if (result.done) break;

    const value = result.value;
    processValue(value);
    count++;

    if (typeof value === "number") {
      total += value;
    }
  }

  if (count > 0 && total > 0) {
    console.log(`\n--- Summary: count=${count}, total=${total}, avg=${(total / count).toFixed(2)} ---`);
  }

  return count;
}

module.exports = { runWithTimeout };
