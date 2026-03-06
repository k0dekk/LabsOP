'use strict'

function sumDoWhile(...args) {
  let result = 0;
  let i = 0;
  do {
    result += args[i];
    i++;
  } while (i < args.length);
  return result;
}

console.log(sumDoWhile(10, 20, 10));