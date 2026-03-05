'use strict';

function inc(obj) {
    obj.a = obj.a + 1;
}

const obj = { a: 5 };
inc(obj);

console.dir(obj); // a: 6
