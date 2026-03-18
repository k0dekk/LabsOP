let _objId = 0;
const _objRegistry = new WeakMap();

function getObjId(obj) {
  if (!_objRegistry.has(obj)) _objRegistry.set(obj, ++_objId);
  return `@ref:${_objRegistry.get(obj)}`;
}

function serializeArg(arg) {
  if (arg === undefined) return '__undefined__';
  if (arg === null) return '__null__';
  if (typeof arg === 'symbol') return `__symbol__:${arg.toString()}`;
  if (typeof arg === 'function') return getObjId(arg);
  if (typeof arg === 'object') {
    try { return JSON.stringify(arg); } catch { return getObjId(arg); }
  }
  return String(arg);
}

function createKey(args) {
  return args.map(serializeArg).join('|__|');
}

const EVICTION = {
  LRU: (cache, maxSize) => {
    while (cache.size >= maxSize) {
      cache.delete(cache.keys().next().value);
    }
  },

  LFU: (cache, maxSize) => {
    while (cache.size >= maxSize) {
      let minCount = Infinity;
      let minKey = null;
      for (const [k, v] of cache) {
        if (v.accessCount < minCount) {
          minCount = v.accessCount;
          minKey = k;
        }
      }
      if (minKey !== null) cache.delete(minKey);
    }
  },

  TIME_BASED: (cache, _maxSize, maxAgeMs) => {
    const now = Date.now();
    for (const [key, entry] of cache) {
      if (now - entry.timestamp > maxAgeMs) cache.delete(key);
    }
  },
};

function memoize(fn, options = {}) {
  const { maxSize = Infinity, eviction = 'LRU', maxAgeMs = 60000 } = options;

  const cache = new Map();
  const evictFn = typeof eviction === 'function' ? eviction : (EVICTION[eviction] || EVICTION.LRU);
  const isTimeBased = eviction === 'TIME_BASED';

  return function memoized(...args) {
    const key = createKey(args);

    if (cache.has(key)) {
      const entry = cache.get(key);

      if (isTimeBased && Date.now() - entry.timestamp > maxAgeMs) {
        cache.delete(key);
      } else {
        cache.delete(key);
        cache.set(key, entry);
        entry.lastAccess = Date.now();
        entry.accessCount++;
        return entry.value;
      }
    }

    if (isTimeBased) {
      EVICTION.TIME_BASED(cache, null, maxAgeMs);
    } else if (maxSize !== Infinity) {
      evictFn(cache, maxSize);
    }

    const value = fn.apply(this, args);

    cache.set(key, {
      value,
      timestamp: Date.now(),
      lastAccess: Date.now(),
      accessCount: 1,
    });

    return value;
  };
}

module.exports = { memoize, EVICTION };