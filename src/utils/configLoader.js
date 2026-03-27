const path = require('path');
// Set the config directory to be src/config relative to the project root
const configDir = path.join(__dirname, '..', 'config');
process.env.NODE_CONFIG_DIR = configDir;
const config = require('config');

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