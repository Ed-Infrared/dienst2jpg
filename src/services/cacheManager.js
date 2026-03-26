const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let db = null;

function initCache() {
  const cacheDir = './cache';
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const dbPath = path.join(cacheDir, 'serviceNumberCache.sqlite');
  db = new Database(dbPath);

  // Create table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS cache (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      expires_at INTEGER
    )
  `);
}

function getFromCache(key) {
  if (!db) initCache();

  const row = db.prepare('SELECT value, expires_at FROM cache WHERE key = ?').get(key);

  if (!row) {
    return undefined;
  }

  // Check if expired
  const now = Date.now();
  if (row.expires_at !== null && row.expires_at < now) {
    // Delete expired entry
    db.prepare('DELETE FROM cache WHERE key = ?').run(key);
    return undefined;
  }

  return JSON.parse(row.value);
}

function saveToCache(key, value, ttl) {
  if (!db) initCache();

  const expires_at = ttl > 0 ? Date.now() + (ttl * 1000) : null;
  const valueStr = JSON.stringify(value);

  db.prepare(`
    INSERT OR REPLACE INTO cache (key, value, expires_at)
    VALUES (@key, @value, @expires_at)
  `).run({ key, value: valueStr, expires_at });
}

module.exports = { getFromCache, saveToCache };