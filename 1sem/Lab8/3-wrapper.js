'use strict'

function contract(fn, ...types) {
  return function (...args) {

    for (let i = 0; i < args.length; i++) {
      const expected = types[i];
      const actual = args[i];

      if (typeof actual !== expected.name.toLowerCase()) {
        throw new TypeError(
          `Arg ${i + 1}  ${expected.name}`
        );
      }
    }

    const result = fn(...args);

    const expectedReturn = types[types.length - 1];
    if (typeof result !== expectedReturn.name.toLowerCase()) {
      throw new TypeError(
        `expected typeof res ${expectedReturn.name}`
      );
    }

    return result;
  };
}

const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);
const res1 = addNumbers(2, 3);
console.dir(res1); // Output: 5

const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
const res2 = concatStrings('Hello ', 'world!');
console.dir(res2); // Output: Hello world!
