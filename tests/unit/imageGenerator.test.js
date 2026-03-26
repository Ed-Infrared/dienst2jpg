const { convertImagesToJpg } = require('../../src/services/imageGenerator');
const mock = require('mock-fs');
const fs = require('fs');
const path = require('path');

describe('Image Generator', () => {
  const outputDir = './test-output';

  beforeEach(() => {
    mock({
      [outputDir]: {}
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test('should convert image buffers to JPG files', async () => {
    const images = [
      Buffer.from('mock image data 1'),
      Buffer.from('mock image data 2')
    ];
    const baseName = 'test';

    const result = await convertImagesToJpg(images, outputDir, baseName);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0]).toMatch(/.*test_pagina_1\.jpg$/);
    expect(result[1]).toMatch(/.*test_pagina_2\.jpg$/);

    // Verify files were created
    expect(fs.existsSync(result[0])).toBe(true);
    expect(fs.existsSync(result[1])).toBe(true);

    // Verify content
    expect(fs.readFileSync(result[0])).toEqual(images[0]);
    expect(fs.readFileSync(result[1])).toEqual(images[1]);
  });

  test('should handle empty images array', async () => {
    const result = await convertImagesToJpg([], outputDir, 'test');
    expect(result).toEqual([]);
  });
});