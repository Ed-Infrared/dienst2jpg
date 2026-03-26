const { saveJpgFile } = require('../../src/services/fileManager');
const mock = require('mock-fs');
const fs = require('fs');
const path = require('path');

describe('File Manager', () => {
  const outputDir = './output';
  const filePath = path.join(outputDir, 'test.jpg');

  beforeEach(() => {
    mock({
      [outputDir]: {}
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test('should save JPG data to file', async () => {
    const jpgData = Buffer.from('mock JPG data');
    await saveJpgFile(jpgData, filePath);
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath)).toEqual(jpgData);
  });

  test('should create directories if they do not exist', async () => {
    const nestedPath = path.join(outputDir, 'subdir', 'test.jpg');
    const jpgData = Buffer.from('mock JPG data');
    await saveJpgFile(jpgData, nestedPath);
    expect(fs.existsSync(nestedPath)).toBe(true);
    expect(fs.readFileSync(nestedPath)).toEqual(jpgData);
  });
});