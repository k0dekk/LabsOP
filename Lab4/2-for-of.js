'use strict'

function sumForOf(...args) {
  let result = 0;
  for (const num of args) {
    result += num;
  }
  return result;
}

console.log(sumForOf(1000, 0, 4, 8));
