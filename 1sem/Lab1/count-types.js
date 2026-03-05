'use strict'

const array = [
    true, 'hello', 2025, null, 53, false, "Hello World!", 'KPI_shkola_zhizni',
    "e", NaN, undefined, { x: 1 }, [1, 2], () => { }, 'test', 0, 3.14159
];

const typesCount = {};

for (const item of array) {
  const type = typeof item;
  typesCount[type] = (typesCount[type] || 0) + 1;
}

console.dir(typesCount);
