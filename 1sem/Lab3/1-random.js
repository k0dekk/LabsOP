'use strict'

function random(min, max) {
    if (max === undefined) { // random(5) = random(0, 5)
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(random(1, 10)); 
console.log(random(5));     