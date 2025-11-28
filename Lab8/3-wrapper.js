'use strict'

const contract = (fn, ...types) => (...args) => {
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const def = types[i];
    const name = def.name.toLowerCase();
    if (typeof arg !== name) {
      throw new TypeError(`Argument type ${name} expected`);
    }
  }
  const res = fn(...args);
  const def = types[types.length - 1];
  const name = def.name.toLowerCase();
  if (typeof res !== name) {
    throw new TypeError(`Result type ${name} expected`);
  }
  return res;
};

const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);

try {
  const res = addNumbers(2, 3);
  console.log(`addNumbers(2, 3) = ${res}`);
} catch (e) {
  console.error(e.message);
}

const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);

try {
  const res = concatStrings('Hello ', 'world!');
  console.log(`concatStrings result: '${res}'`);
} catch (e) {
  console.error(e.message);
}

try {
  addNumbers(2, '3');
} catch (e) {
  console.error("Помилка (очікувана):", e.message); 
}