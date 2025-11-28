'use strict'

const arr = [2, 1, 1, 3, 2];

function unique(arr) {
  const result = [];
  for (let item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

console.log(unique(arr));
