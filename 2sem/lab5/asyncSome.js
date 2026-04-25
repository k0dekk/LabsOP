export function asyncSomeCallback(arr, predicate, cb) {
  function next(i) {
    if (i >= arr.length) return cb(null, false);

    predicate(arr[i], i, arr, (err, res) => {
      if (err) return cb(err);
      if (res) return cb(null, true);
      next(i + 1);
    });
  }
  next(0);
}

export async function asyncSomePromise(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    const res = await predicate(arr[i], i, arr);
    if (res) return true;
  }
  return false;
}

export async function asyncSomePromiseAbortable(arr, predicate, signal) {
  for (let i = 0; i < arr.length; i++) {
    if (signal?.aborted) {
      throw new DOMException('Iteration aborted', 'AbortError');
    }
    
    const res = await predicate(arr[i], i, arr, signal);
    if (res) return true;
  }
  return false;
}