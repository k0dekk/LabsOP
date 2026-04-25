import { checkFieldAvailability } from './firebase.js';
import { asyncSomeCallback, asyncSomePromise, asyncSomePromiseAbortable } from './asyncSome.js';

// testTaken (email taken)
const testTaken = [
  { type: 'username', value: 'newUser99' },
  { type: 'email', value: 'test@test.com' }
];

// testFree (both free)
const testFree = [
  { type: 'username', value: 'super_sanco' },
  { type: 'email', value: 'brand.new@mail.com' }
];

const printRes = (isTaken) => console.log(isTaken ? '-> result: validation failed' : '-> result: ok');

export async function runDemos() {

  // promise / async-await version
  console.log('start promise / async-await');
  
  console.log('\ntesting taken:');
  let res1 = await asyncSomePromise(testTaken, f => checkFieldAvailability(f));
  printRes(res1);

  console.log('\ntesting free:');
  let res2 = await asyncSomePromise(testFree, f => checkFieldAvailability(f));
  printRes(res2);

  // callback version
  console.log('\nstart callback version');
  
  return new Promise((resolve) => {
    asyncSomeCallback(testTaken,
      // повертає promise, але asyncSomeCallback її не використовує, а працює з колбеком done
      (f, i, arr, done) => {
        checkFieldAvailability(f).then(res => done(null, res)).catch(err => done(err));
      }, 
      (err, res) => {
        if (err) console.error('cb error:', err);
        else printRes(res);
        resolve();
      }
    );
  }).then(demoAbortController);
}

async function demoAbortController() {
  // юзер почав реєстрацію, запити до Firebase пішли, але через 500мс він закрив форму
  console.log('\nstart abort controller test');
  
  const controller = new AbortController();
  
  setTimeout(() => {
    console.log('timeout 500ms reached. calling abort()...');
    controller.abort();
  }, 500);
  
  try {
    await asyncSomePromiseAbortable(
      testTaken, 
      (f, i, arr, signal) => checkFieldAvailability(f, signal),
      controller.signal
    );
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('catch: AbortError (iteration stopped)');
    } else {
      console.error('unknown error:', err);
    }
  }
}