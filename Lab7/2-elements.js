'use strict'

const num = [1, 2, 3, 4, 5, 6, 7];

function removeElements(array, ...items) {
  items.forEach(item => {
    const index = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  });
}

removeElements(num, 5, 1, 6);
console.log(num);