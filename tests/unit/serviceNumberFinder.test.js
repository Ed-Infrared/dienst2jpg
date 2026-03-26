const { findServiceNumberInPdfs } = require('../../src/services/serviceNumberFinder');
const mock = require('mock-fs');

describe('Service Number Finder', () => {
  beforeEach(() => {
    mock({
      './diensten': {
        'ZAANDAM_MA-VR.pdf': Buffer.from('fake pdf content', 'utf-8'),
        'other.pdf': Buffer.from('fake pdf content', 'utf-8')
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test('should find dienstnummer in PDF and return file path and page numbers', async () => {
    const result = await findServiceNumberInPdfs('V1234', './diensten');
    // Should find it in ZAANDAM_MA-VR.pdf
    expect(result).toContainEqual(expect.objectContaining({
      filePath: './diensten/ZAANDAM_MA-VR.pdf',
      pageNumbers: [1]
    }));
  });

  test('should return empty array when dienstnummer not found', async () => {
    const result = await findServiceNumberInPdfs('NOTFOUND', './diensten');
    expect(result).toEqual([]);
  });
});