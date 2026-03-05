'use strict'

const num = [1, 2, 4, 5, 6, 7, 8, 9];

function removeElement(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

removeElement(num, 1);
removeElement(num, 2);
console.log(num);