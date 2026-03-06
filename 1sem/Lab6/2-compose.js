'use strict'

const inc = (x) => x + 1;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

const compose = (...fns) => {
  const handlers = [];

  const composed = (x) => {
    if (fns.length === 0) return x;
    let res = x;
    try {
      for (let i = fns.length - 1; i >= 0; i--) {
        res = fns[i](res);
      }
      return res;
    } catch (error) {
      for (const handler of handlers) {
        handler(error);
      }
      return undefined;
    }
  };

  composed.on = (name, handler) => {
    if (name === "error") {
      handlers.push(handler);
    }
  };
  return composed;
};

const f1 = compose(inc, twice, cube);
console.log(f1(5));