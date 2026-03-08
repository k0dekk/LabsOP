/**
 * Browser demo: Generators + Timeout Iterator
 */

function* fibonacciGenerator() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function runWithTimeout(iterator, timeoutSeconds, processor, outputFn) {
  const endTime = Date.now() + timeoutSeconds * 1000;
  let count = 0;
  let total = 0;
  const out = outputFn || ((s) => console.log(s));
  const processValue = processor || ((v) => out(String(v)));

  function tick() {
    if (Date.now() >= endTime) {
      if (count > 0 && total > 0) {
        out(`--- Summary: count=${count}, total=${total}, avg=${(total / count).toFixed(2)} ---`);
      }
      return;
    }
    const r = iterator.next();
    if (r.done) return;
    processValue(r.value);
    count++;
    if (typeof r.value === "number") total += r.value;
    setTimeout(tick, 0);
  }
  tick();
}
