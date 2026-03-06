'use strict'

function ipToInt(ip = '127.0.0.1') {
    const parts = ip.split('.') // ['127', '0', '0', '1' ]
    const numbers = parts.map(Number); // [127, 0, 0, 1]

    const shifted = [];

    for (let i = 0; i < numbers.length;) {
        shifted[i] = numbers[i] << ((3 - i) * 8); // 127 << 24, 0 << 16, 0 << 8, 1 << 0
        i++;
    }

    let sum = 0; 
    for (const value of shifted) {
        sum += value; // 2130706432 + 0 + 0 + 1
    }
    return sum;
}

console.log(ipToInt()); // 2130706433

// using reduce

function ipToIntByReduce(ip = '127.0.0.1') {
    const p = ip.split ('.')
    const n = p.map(Number);
    return n.reduce((res, octet) => (res << 8) + octet, 0);

}

console.log(ipToIntByReduce()) // 2130706433