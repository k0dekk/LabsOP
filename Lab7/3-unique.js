'use strict'

const arr = [2, 1, 1, 3, 2];
const result = unique(['top', 'bottom', 'top', 'left']);
const unique = (array, item) => array.filter((el) => el !== item);
console.log(unique(arr, 1));
console.log(result);
