import { checkFieldAvailability } from './Firebase.js';
import { asyncSomeCallback, asyncSomePromise } from './asyncSome.js';

const testData = [
  { type: 'username', value: 'sanco123' },
  { type: 'email', value: 'test@test.com' }
];

const testDataFree = [
  { type: 'username', value: 'sanco123' },
  { type: 'email', value: 'new@mail.com' }
];

export async function runDemos() {
  console.log('callback demo');
  
  asyncSomeCallback(testData, (f, i, arr, done) => {
    checkFieldAvailability(f).then(res => done(null, res));
  }, (err, res) => {
    console.log('Callback res 1:', res);
    
    console.log('promise demo');
    testPromise();
  });
}

async function testPromise() {
  let res1 = await asyncSomePromise(testData, f => checkFieldAvailability(f));
  console.log('Promise res 1:', res1);

  let res2 = await asyncSomePromise(testDataFree, f => checkFieldAvailability(f));
  console.log('Promise res 2 (free):', res2);
}