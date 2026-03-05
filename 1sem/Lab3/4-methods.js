'use strict';

const iface = {
  m1: x => [x],
  m2: function (x, y) {
    return [x, y];
  },
  m3(x, y, z) {
    return [x, y, z];
  }
}

function methods(iface) { 
  const names = []; 
  for (const key in iface) {
    const fn = iface[key]; 
    if (typeof fn === 'function') { 
    names.push([key, fn.length]);
    }
  }
  return names;
};

for (const row of methods(iface)) {
  console.log(row);
}