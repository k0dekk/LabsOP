'use strict'

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 10, 9],
];

let max = matrix[0][0];
for (let row of matrix) {
  for (let value of row) {
    if (value > max) {
      max = value;
    }
  }
}

console.log(max);