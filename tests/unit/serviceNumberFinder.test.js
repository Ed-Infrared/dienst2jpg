const { findServiceNumberInPdfs } = require('../../src/services/serviceNumberFinder');
const mock = require('mock-fs');
jest.mock('pdf-parse');

describe('Service Number Finder', () => {
  const { PDFParse } = require('pdf-parse');

  beforeEach(() => {
    mock({
      './diensten': {
        'ZAANDAM_MA-VR.pdf': Buffer.from('dummy', 'utf-8'),
        'other.pdf': Buffer.from('dummy', 'utf-8')
      }
    });

    // Reset the mock implementation
    PDFParse.mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  test('should find dienstnummer in PDF and return file path and page numbers', async () => {
    // Mock the getText method to return text with V4001
    PDFParse.mockImplementation(() => {
      return {
        getText: jest.fn().mockResolvedValue('Some text V4001 more text')
      };
    });

    const result = await findServiceNumberInPdfs('V4001', './diensten');
    // Should find it in ZAANDAM_MA-VR.pdf
    expect(result).toContainEqual(expect.objectContaining({
      filePath: './diensten/ZAANDAM_MA-VR.pdf',
      pageNumbers: [1]
    }));
  });

  test('should return empty array when dienstnummer not found', async () => {
    // Mock the getText method to return text without V9999
    PDFParse.mockImplementation(() => {
      return {
        getText: jest.fn().mockResolvedValue('Some text without the service number')
      };
    });

    const result = await findServiceNumberInPdfs('V9999', './diensten');
    expect(result).toEqual([]);
  });
});