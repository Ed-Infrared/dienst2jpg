const { parseArguments } = require('../../src/cli');
const mock = require('mock-fs');

describe('CLI Interface', () => {
  afterEach(() => {
    mock.restore();
  });

  describe('parseArguments', () => {
    test('should parse dienstnummer and output directory', () => {
      const argv = ['V1234', '--output', './custom-output'];
      const args = parseArguments(argv);
      expect(args.serviceNumber).toBe('V1234');
      expect(args.output).toBe('./custom-output');
    });

    test('should use default output directory when not specified', () => {
      const argv = ['D5678'];
      const args = parseArguments(argv);
      expect(args.serviceNumber).toBe('D5678');
      expect(args.output).toBe('./output'); // default from config
    });

    test('should handle cache options', () => {
      const argv = ['V1234', '--cache-enabled', 'false', '--cache-ttl', '1800'];
      const args = parseArguments(argv);
      expect(args.serviceNumber).toBe('V1234');
      expect(args.cacheEnabled).toBe(false);
      expect(args.cacheTtl).toBe(1800);
    });

    test('should require dienstnummer argument', () => {
      const argv = [];
      expect(() => {
        parseArguments(argv);
      }).toThrow(/dienstnummer/);
    });
  });
});