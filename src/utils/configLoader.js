const config = require('config');
const path = require('path');

function loadConfig() {
  // config module automatically loads from:
  // - ./config/default.json
  // - ./config/{environment}.json
  // - ./config/local.{json,yaml,toml}
  // - environment variables
  // We require explicit config file, so we'll validate that required fields exist

  const requiredFields = ['pdfDirectory', 'outputDirectory'];
  for (const field of requiredFields) {
    if (!config.has(field)) {
      throw new Error(`Missing required configuration: ${field}`);
    }
  }

  return config.get;
}

module.exports = { loadConfig };