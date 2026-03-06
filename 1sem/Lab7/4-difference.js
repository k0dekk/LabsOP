'use strict'

function difference(array1, array2) {
  return array1.filter(item => !array2.includes(item));
}

const arr1 = [7, -2, 10, 5, 0];
const arr2 = [0, 10];
console.log(difference(arr1, arr2));

const cityArr1 = ['Beijing', 'Kiev'];
const cityArr2 = ['Kiev', 'London', 'Baghdad'];
console.log(difference(cityArr1, cityArr2));
