const takenUsernames = new Set(['admin', 'user1', 'root', 'sasha']);
const takenEmails = new Set(['admin@example.com', 'test@test.com']);

const MIN_DELAY = 300;
const MAX_DELAY = 800;

const randomDelay = () => {
  return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
};

export function checkFieldAvailability(field) {
  return new Promise((resolve) => {
    const delay = randomDelay();
    
    setTimeout(() => {      
      let isTaken = false;

      if (field.type === 'username') {
        isTaken = takenUsernames.has(field.value);
      } else if (field.type === 'email') {
        isTaken = takenEmails.has(field.value);
      }

      console.log(`[db] check ${field.type}='${field.value}' | taken=${isTaken} (${delay}ms)`);
      resolve(isTaken);
    }, delay); 
  });
}