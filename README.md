# Лабораторні роботи — еволюція проєкту

## Lab 1 — базова реалізація
- Fibonacci generator
- Timeout Iterator
- `index.html` — веб-демо, `node main.js` — консоль

## Lab 2 — структура проєкту
- Код розділений по модулях: `generators`, `timeoutIterator`, `index`
- `package.json`, `.gitignore`, `LICENSE` (MIT)
- Бібліотека `lib/` + окремий приклад `example/`
- Локальна залежність: `"generators-lib": "file:../lib"`
- Git репозиторій

- `index.html` — веб-демо (як у Lab 1), `cd example && npm install && node index.js`

## Lab 3 — memoization
- Всі модулі з Lab 2
- `memoize.js` — кешування з eviction: LRU, LFU, TIME_BASED, Custom
- Налаштовуваний розмір кешу

- `index.html` — веб-демо з виводом кешу, eviction, hits/misses
