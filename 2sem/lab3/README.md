# Memoization

Implementation of a memoization function that caches results of pure functions to avoid repeated calculations.

## Features
- configurable cache size
- LRU and LFU eviction strategies
- time-based expiration
- custom eviction policy

## Run

```bash
git clone <repo_url>
cd example
npm install
node index.js
```

---

## Example Output

```
0.01 sec Fibonacci

0
1
1
2
3
5
8
13
21
34
55
89
144
233
...
1.788903347851832e+32

--- Summary: count=157, total=4.683409767264573e+32, avg=2.9830635460283903e+30 ---

Memoization

Memoized Fibonacci (LRU, maxSize=50):
first fib(35): 0.341ms
cached fib(35): 0.009ms
fib(35) = 9227465, cached = 9227465, same: true

LFU (maxSize=3): 2 4 6
After 1,1,2 - 3 is evicted, memoLFU(3) recomputes: 6

Custom eviction (FIFO): [ 1, 4, 9, 16, 25, 36 ]
Cache hit for 1: 1
```
