function createKey(args) {
  return JSON.stringify(args);
}

const EVICTION = {
  // LRU
  LRU: (cache, maxSize) => {
    const entries = [...cache.entries()];
    if (entries.length <= maxSize) return;
    entries.sort((a, b) => a[1].lastAccess - b[1].lastAccess);
    const toRemove = entries.length - maxSize;
    for (let i = 0; i < toRemove; i++) {
      cache.delete(entries[i][0]);
    }
  },

  // LFU
  LFU: (cache, maxSize) => {
    const entries = [...cache.entries()];
    if (entries.length <= maxSize) return;
    entries.sort((a, b) => a[1].accessCount - b[1].accessCount);
    const toRemove = entries.length - maxSize;
    for (let i = 0; i < toRemove; i++) {
      cache.delete(entries[i][0]);
    }
  },

  TIME_BASED: (cache, _, maxAgeMs) => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (now - entry.timestamp > maxAgeMs) {
        cache.delete(key);
      }
    }
  },
};

function memoize(fn, options = {}) {
  const { maxSize, eviction = "LRU", maxAgeMs = 60000 } = options;

  const cache = new Map();

  const getEvictionFn = () => {
    if (typeof eviction === "function") return eviction;
    return EVICTION[eviction] || EVICTION.LRU;
  };

  const evict = getEvictionFn();

  return function memoized(...args) {
    const key = createKey(args);

    if (cache.has(key)) {
      const entry = cache.get(key);
      const isExpired = eviction === "TIME_BASED" && maxAgeMs && Date.now() - entry.timestamp > maxAgeMs;
      if (isExpired) {
        cache.delete(key);
      } else {
        entry.lastAccess = Date.now();
        entry.accessCount++;
        return entry.value;
      }
    }

    const value = fn.apply(this, args);

    cache.set(key, {
      value,
      timestamp: Date.now(),
      lastAccess: Date.now(),
      accessCount: 1,
    });

    if (eviction === "TIME_BASED") {
      EVICTION.TIME_BASED(cache, null, maxAgeMs);
    } else if (maxSize !== undefined && maxSize !== null) {
      evict(cache, maxSize);
    }

    return value;
  };
}

module.exports = { memoize, EVICTION };
