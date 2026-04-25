// Імітація звернення до Firebase (username/email availability check)
// В проєкті тут був би запит до Firestore
// але для демо захардкодив два сети з вже зайнятими значеннями

const takenUsernames = new Set(['admin', 'user1', 'root', 'sasha']);
const takenEmails = new Set(['admin@example.com', 'test@test.com']);

const MIN_DELAY = 300;
const MAX_DELAY = 800;

// імітація випадкової затримки відповіді від Firebase
const randomDelay = () => {
  return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
};

export function checkFieldAvailability(field, signal = null) {
  return new Promise((resolve, reject) => {
    const delay = randomDelay();

    // перевірка на випадок, якщо запит був скасований до того, як ми почали обробляти його
    if (signal?.aborted) {
      reject(new DOMException(`Request aborted for ${field.type}`, 'AbortError'));
      return;
    }

    const timerId = setTimeout(() => {      
      let isTaken = false;

      if (field.type === 'username') {
        isTaken = takenUsernames.has(field.value);
      } else if (field.type === 'email') {
        isTaken = takenEmails.has(field.value);
      }

      console.log(`[db] check ${field.type}='${field.value}' | taken=${isTaken} (${delay}ms)`);
      resolve(isTaken);
    }, delay); 

    // Якщо юзер переписав дані форми поки запит іще летів до сервера
    // чистимо таймер і відхиляємо проміс
    signal?.addEventListener('abort', () => {
      clearTimeout(timerId); // memory leak prevention
      reject(new DOMException(`Request aborted for ${field.type}`, 'AbortError'));
    });
  });
}