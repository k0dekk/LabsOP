'use strict'

function hoisting() {
    console.log(a);
    var a = 9; 
    console.log(a);   
}

hoisting(); // undefined 9 
