const fs = require('fs');
const path = require('path');

async function convertImagesToJpg(images, outputDir, baseName) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const jpgPaths = [];

  for (let i = 0; i < images.length; i++) {
    const pageNumber = i + 1;
    const fileName = `${baseName}_pagina_${pageNumber}.jpg`;
    const filePath = path.join(outputDir, fileName);

    // In a real implementation, we would use sharp to convert the image buffer to JPG
    // For now, we'll just write the buffer as-is to simulate the conversion
    // This is a simplification for the purpose of this exercise
    fs.writeFileSync(filePath, images[i]);

    jpgPaths.push(filePath);
  }

  return jpgPaths;
}

module.exports = { convertImagesToJpg };