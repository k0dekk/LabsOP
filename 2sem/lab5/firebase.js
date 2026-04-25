const takenUsernames = ['admin', 'user1', 'root', 'newUser42']; 
const takenEmails = ['admin@example.com', 'test@test.com'];

export function checkFieldAvailability(field) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let isTaken = false;
      
      if (field.type === 'username') {
        isTaken = takenUsernames.includes(field.value);
      } else if (field.type === 'email') {
        isTaken = takenEmails.includes(field.value);
      }

      console.log(`firebase check -> ${field.type}: ${field.value} = ${isTaken}`);
      resolve(isTaken);
    }, 500); 
  });
}