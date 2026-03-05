'use strict'

const persons = {
  stalin: { born: 1878, died: 1953 },
  kravchuk: { born: 1934, died: 2022 },
  makedonskiy: { born: -356, died: -323 },
  hitler: { born: 1889, died: 1945 },
};

function ages(persons) {
  const result = {};
  for (const diff in persons) {
    const person = persons[diff];
    result[diff] = person.died - person.born;
  }
  return result;
}

console.log(ages(persons));