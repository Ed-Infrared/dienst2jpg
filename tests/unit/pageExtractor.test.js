const { extractPagesFromPdf } = require('../../src/services/pageExtractor');
const mock = require('mock-fs');

describe('Page Extractor', () => {
  beforeEach(() => {
    mock({
      './diensten': {
        'test.pdf': Buffer.from('PDF content', 'utf-8')
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test('should extract specified pages from PDF', async () => {
    // We'll mock the pdf2pic module to avoid complex setup
    jest.mock('pdf2pic', () => {
      return jest.fn().mockImplementation(() => {
        return {
          convertPage: jest.fn().mockResolvedValue({})
        };
      });
    });

    const result = await extractPagesFromPdf('./diensten/test.pdf', [1, 2]);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    // Each element should be a Buffer (we'll check in a more realistic test)
  });

  test('should throw error if PDF file not found', async () => {
    await expect(extractPagesFromPdf('./diensten/nonexistent.pdf', [1]))
      .rejects.toThrow(/PDF file not found/);
  });
});