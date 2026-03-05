'use strict'

const obj = { a: 1, b: 2, c: 3 };

function iterate(object, callback) {
  for (const key in object) {
    callback(key, object[key], object);
  }
}

iterate(obj, (key, value) => {
  console.log({ key, value });
});