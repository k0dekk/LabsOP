function generateKey(length, characters) {
    let result = '';
    for (let i = 0; i < length;) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
        i++;
    }
    return result;
}

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
const key = generateKey(8, characters);
console.log(key);