'use strict'

const dormitoryTrepHata = [
    { name: "Sasha Banyak", phone: "+380123912083" },
    { name: "Sasha Oksiuk", phone: "+380971289893" },
    { name: "Artem Romaniuk", phone: "+380687512311" },
    { name: "Artem Trep", phone: "+380663172898" },
    { name: "David", phone: "+380951738912" },
    { name: "Vovan", phone: "+380971928782" },
];

function findPhoneByName(name) {
    for (const obj of dormitoryTrepHata) {
        if (obj.name === name) {
            return obj.phone;
        }
    }
    return "Cant find any number";
}

console.log(findPhoneByName("Sasha Oksiuk"));
console.log(findPhoneByName("Vovan"));

// Using hash

const hashDormitoryHata = {
    "Sasha Banyak": "+380123912083",
    "Sasha Oksiuk": "+380971289893",
    "Artem Romaniuk": "+380687512311",
    "Artem Trep": "+380663172898",
    "David": "+380951738912",
    "Vovan": "+380971928782",
};

function findPhoneByNameHash(name) {
    return hashDormitoryHata[name] || "Cant find any number";
}

console.log(findPhoneByNameHash("Artem Romaniuk"));
console.log(findPhoneByNameHash("David"));