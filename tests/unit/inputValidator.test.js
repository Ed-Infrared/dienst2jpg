const { validateServiceNumber } = require('../../src/services/inputValidator');

describe('Input Validator', () => {
  test('should validate correct dienstnummer format', () => {
    expect(validateServiceNumber('V1234')).toBe(true);
    expect(validateServiceNumber('D5678')).toBe(true);
    expect(validateServiceNumber('D21234')).toBe(true);
    expect(validateServiceNumber('G9876')).toBe(true);
    expect(validateServiceNumber('P5432')).toBe(true);
    expect(validateServiceNumber('X0000')).toBe(true);
  });

  test('should reject invalid dienstnummer formats', () => {
    expect(validateServiceNumber('V123')).toBe(false); // too short
    expect(validateServiceNumber('V12345')).toBe(false); // too long
    expect(validateServiceNumber('A1234')).toBe(false); // wrong letter
    expect(validateServiceNumber('V12A4')).toBe(false); // non-digit
    expect(validateServiceNumber('')).toBe(false); // empty
    expect(validateServiceNumber('VD1234')).toBe(false); // multiple prefixes not allowed per spec
  });
});