'use strict'
function fn() {
    const obj1 = { name: "Sasha" };
    let obj2 = { name: "Sanyok" };

    // obj1.name = "Other";
    obj2.name = "Kastrulya";

    console.log(obj1, obj2);
}

fn();