'use strict'

const sumReduce = (...args) => args.reduce((acc, current) => acc + current, 0);

console.log(sumReduce(9, 8, 7));