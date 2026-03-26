const fs = require('fs');
const path = require('path');

async function saveJpgFile(jpgData, filePath) {
  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the JPG data to file
  fs.writeFileSync(filePath, jpgData);
}

module.exports = { saveJpgFile };