'use strict'

function array() {
  const store = [];

  const func = (index) => {
    return store[index];
  };
  func.push = (value) => {
    store.push(value);
  };
  func.pop = () => {
    return store.pop();
  };
  return func;
}

const arr = array();

arr.push('first');
arr.push('second');
arr.push('third');

console.log(arr(0)); // Выводит: first
console.log(arr(1)); // Выводит: second
console.log(arr(2)); // Выводит: third

console.log(arr.pop()); // Выводит: third
console.log(arr.pop()); // Выводит: second
console.log(arr.pop()); // Выводит: first

console.log(arr.pop()); // Выводит: undefined