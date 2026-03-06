'use strict'

const inc = x => ++x;
const twice = x => x * 2;
const cube = x => x ** 3;

const pipe = (...fns) => {
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      console.log('All arguments passed to pipe must be functions');
    }
  }
  return (x) => fns.reduce((v, f) => f(v), x);
};

const f1 = pipe(inc, twice, cube);
const f2 = pipe(inc, inc);

console.log(f1(5));
console.log(f2(7));