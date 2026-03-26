const { getFromCache, saveToCache } = require('../../src/services/cacheManager');
const fs = require('fs');
const path = require('path');

describe('Cache Manager', () => {
  const cacheDir = './cache';

  beforeEach(() => {
    // Simple cleanup
    try {
      fs.rmdirSync(cacheDir, { recursive: true });
    } catch (e) {
      // Ignore if directory doesn't exist
    }
  });

  afterEach(() => {
    // Simple cleanup
    try {
      fs.rmdirSync(cacheDir, { recursive: true });
    } catch (e) {
      // Ignore if directory doesn't exist
    }
  });

  test('should save and retrieve data from cache', async () => {
    const key = 'V1234';
    const value = { filePath: './diensten/test.pdf', pageNumbers: [1] };
    const ttl = 3600; // 1 hour

    await saveToCache(key, value, ttl);
    const cachedValue = await getFromCache(key);

    expect(cachedValue).toEqual(value);
  });

  test('should return undefined for non-existent key', async () => {
    const cachedValue = await getFromCache('NONEXISTENT');
    expect(cachedValue).toBeUndefined();
  });

  // Note: TTL testing would require mocking time or waiting, which is complex in unit tests
  // In a real implementation, we would rely on integration tests for timing behavior
});