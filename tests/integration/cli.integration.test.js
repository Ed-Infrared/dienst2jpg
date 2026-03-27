const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('CLI Integration Tests', () => {
  const cliPath = path.join(__dirname, '..', '..', 'src', 'cli.js');

  test('should show help when called with --help', (done) => {
    const cli = spawn('node', [cliPath, '--help']);
    let output = '';
    cli.stdout.on('data', (data) => {
      output += data.toString();
    });
    cli.on('close', (code) => {
      expect(code).toBe(0);
      expect(output).toContain('Extract PDF pages based on dienstnummer');
      done();
    });
  });

  test('should return error when no dienstnummer provided', (done) => {
    const cli = spawn('node', [cliPath, 'extract']);
    let errorOutput = '';
    cli.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    cli.on('close', (code) => {
      expect(code).toBe(1);
      expect(errorOutput).toContain('dienstnummer is required');
      done();
    });
  });
});