/**
 * Lab 3: Memoization (кеш, eviction, stats)
 */

const EVICTION = {
  LRU: (cache, maxSize) => {
    const entries = [...cache.entries()];
    if (entries.length <= maxSize) return [];
    entries.sort((a, b) => a[1].lastAccess - b[1].lastAccess);
    const evicted = entries.slice(0, entries.length - maxSize).map((e) => e[0]);
    evicted.forEach((k) => cache.delete(k));
    return evicted;
  },
  LFU: (cache, maxSize) => {
    const entries = [...cache.entries()];
    if (entries.length <= maxSize) return [];
    entries.sort((a, b) => a[1].accessCount - b[1].accessCount);
    const evicted = entries.slice(0, entries.length - maxSize).map((e) => e[0]);
    evicted.forEach((k) => cache.delete(k));
    return evicted;
  },
  TIME_BASED: (cache, _, maxAgeMs) => {
    const now = Date.now();
    const evicted = [];
    for (const [key, entry] of cache.entries()) {
      if (now - entry.timestamp > maxAgeMs) {
        evicted.push(key);
        cache.delete(key);
      }
    }
    return evicted;
  },
};

function memoize(fn, options = {}) {
  const { maxSize, eviction = "LRU", maxAgeMs = 60000 } = options;
  const cache = new Map();
  let hits = 0;
  let misses = 0;
  const evictedLog = [];

  const getEvictionFn = () =>
    typeof eviction === "function" ? eviction : EVICTION[eviction] || EVICTION.LRU;
  const evict = getEvictionFn();

  const memoized = function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      const entry = cache.get(key);
      const isExpired = eviction === "TIME_BASED" && maxAgeMs && Date.now() - entry.timestamp > maxAgeMs;
      if (isExpired) {
        cache.delete(key);
        evictedLog.push({ key, reason: "time expired" });
      } else {
        hits++;
        entry.lastAccess = Date.now();
        entry.accessCount++;
        return entry.value;
      }
    }

    misses++;
    const value = fn.apply(this, args);
    cache.set(key, {
      value,
      timestamp: Date.now(),
      lastAccess: Date.now(),
      accessCount: 1,
    });

    if (eviction === "TIME_BASED") {
      const ev = EVICTION.TIME_BASED(cache, null, maxAgeMs);
      ev.forEach((k) => evictedLog.push({ key: k, reason: "time expired" }));
    } else if (maxSize != null) {
      const ev = evict(cache, maxSize);
      if (Array.isArray(ev)) {
        ev.forEach((k) => evictedLog.push({ key: k, reason: eviction }));
      }
    }
    return value;
  };

  memoized.getCacheInfo = () => ({
    entries: [...cache.entries()].map(([key, e]) => ({
      key,
      value: e.value,
      timestamp: new Date(e.timestamp).toLocaleTimeString(),
      lastAccess: new Date(e.lastAccess).toLocaleTimeString(),
      accessCount: e.accessCount,
    })),
    size: cache.size,
    maxSize: maxSize ?? "unlimited",
    eviction,
    hits,
    misses,
    evictedLog: [...evictedLog],
  });

  memoized.clearCache = () => {
    cache.clear();
    evictedLog.length = 0;
    hits = 0;
    misses = 0;
  };

  return memoized;
}
