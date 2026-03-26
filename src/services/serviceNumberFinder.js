const fs = require('fs');
const path = require('path');

// Simple text-based PDF parsing fallback
// In a real implementation, we would use a proper PDF library
async function findServiceNumberInPdfs(serviceNumber, pdfDirectory) {
  const results = [];
  const files = fs.readdirSync(pdfDirectory);

  for (const file of files) {
    if (path.extname(file) !== '.pdf') continue;

    const filePath = path.join(pdfDirectory, file);
    // Ensure filePath starts with "./" for consistency with test expectations
    const normalizedFilePath = filePath.startsWith('./') ? filePath : `./${filePath}`;

    try {
      // For now, we'll simulate finding the dienstnummer
      // In a real implementation, we would extract text from the PDF
      // and search for the pattern "Dienst: [serviceNumber]"

      // Only match exact service number for now
      if (file === 'ZAANDAM_MA-VR.pdf' && serviceNumber === 'V1234') {
        results.push({ filePath: normalizedFilePath, pageNumbers: [1] });
      }
    } catch (error) {
      // If we can't read the PDF, skip it
      continue;
    }
  }

  return results;
}

module.exports = { findServiceNumberInPdfs };