const { validateFilePath, ensureDirectoryExists } = require('../../src/utils/helpers');
const fs = require('fs');
const path = require('path');
const mock = require('mock-fs');

describe('Utils', () => {
  const testDir = './test-utils-dir';

  afterEach(() => {
    mock.restore();
    // Clean up any created directories
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir, { recursive: true });
    }
  });

  describe('validateFilePath', () => {
    test('should return true for valid file path', () => {
      expect(validateFilePath('./test.txt')).toBe(true);
      expect(validateFilePath('/home/user/test.txt')).toBe(true);
    });

    test('should return false for empty string', () => {
      expect(validateFilePath('')).toBe(false);
    });

    test('should return false for non-string', () => {
      expect(validateFilePath(null)).toBe(false);
      expect(validateFilePath(undefined)).toBe(false);
      expect(validateFilePath(123)).toBe(false);
    });
  });

  describe('ensureDirectoryExists', () => {
    test('should create directory if it does not exist', async () => {
      mock({});
      await ensureDirectoryExists(testDir);
      expect(fs.existsSync(testDir)).toBe(true);
    });

    test('should do nothing if directory already exists', async () => {
      mock({
        [testDir]: {}
      });
      await ensureDirectoryExists(testDir);
      expect(fs.existsSync(testDir)).toBe(true);
    });

    test('should create nested directories', async () => {
      mock({});
      const nestedDir = path.join(testDir, 'sub', 'dir');
      await ensureDirectoryExists(nestedDir);
      expect(fs.existsSync(nestedDir)).toBe(true);
    });
  });
});