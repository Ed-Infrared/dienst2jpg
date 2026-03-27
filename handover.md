# Dienst2JPG Project - Developer Handoff

## Project Overview

Dienst2JPG is a Node.js CLI tool designed to extract specific pages from PDF timetables based on dienstnummer (service numbers) and convert them to JPG images. The tool processes public transportation schedule PDFs for Zaandam and outputs the relevant pages as JPG files.

### Key Features
- CLI interface for extracting PDF pages by dienstnummer
- Input validation for dienstnummer format (V, D, D2, G, P, X followed by 4 digits)
- PDF text search using pdf-parse library
- Configurable caching system
- Modular service architecture
- Support for multiple PDF timetables (weekday, weekend schedules)

## File Structure

```
dienst2jpg/
├── diensten/                 # Source PDF timetables
│   ├── ZAANDAM_MA-VR.pdf     # Monday-Friday schedule
│   ├── ZAANDAM_ZATERDAG.pdf  # Saturday schedule
│   └── ZAANDAM_ZONDAG.pdf    # Sunday schedule
├── output/                   # Generated JPG files (created at runtime)
├── src/
│   ├── cli.js                # Main CLI entry point
│   ├── config/               # Configuration files
│   │   ├── default.json      # Default configuration
│   │   └── custom.json.example
│   ├── services/             # Core functionality modules
│   │   ├── cacheManager.js   # Caching logic (mocked)
│   │   ├── fileManager.js    # File saving logic (mocked)
│   │   ├── imageGenerator.js # Image conversion logic (mocked)
│   │   ├── inputValidator.js # Dienstnummer validation
│   │   ├── pageExtractor.js  # PDF page extraction (mocked)
│   │   └── serviceNumberFinder.js # PDF search logic
│   └── utils/                # Utility modules
│       └── configLoader.js   # Configuration loading
├── docs/                     # Documentation
│   └── superpowers/          # Claude Code superpowers documentation
├── demo.js                   # Demonstration script
├── find-service-numbers.js   # Tool to search for dienstnummer patterns
├── test-pdf-parse.js         # PDF parsing test
├── package.json              # Project dependencies and scripts
└── handover.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository
2. Navigate to project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
The project uses the `config` module. Configuration is loaded from:
- `src/config/default.json` (default settings)
- Environment variables
- Custom config files (if created)

Edit `src/config/default.json` to modify:
- `pdfDirectory`: Path to source PDF files
- `outputDirectory`: Path for generated JPG files
- `cacheEnabled`: Boolean to enable/disable caching
- `cacheTtl`: Cache time-to-live in seconds
- `sharp.quality`: Image quality for JPG output (0-100)

## How to Run

### Basic Usage
```bash
# Extract pages for a specific dienstnummer
node src/cli.js extract V1234

# Specify custom output directory
node src/cli.js extract D5678 -o ./custom-output

# Disable caching for this run
node src/cli.js extract V1234 --cache-enabled false

# Set custom cache TTL (seconds)
node src/cli.js extract G9876 --cache-ttl 7200
```

### Help
```bash
node src/cli.js --help
node src/cli.js extract --help
```

## Current Implementation Status

### Completed Components
✅ CLI interface with commander
✅ Input validation for dienstnummer format
✅ PDF text search using pdf-parse
✅ Configuration management
✅ Basic service architecture

### Mocked Components (Requiring Implementation)
⚠️ Page extraction (`src/services/pageExtractor.js`)
⚠️ Image generation/conversion (`src/services/imageGenerator.js`)
⚠️ File saving (`src/services/fileManager.js`)
⚠️ Caching (`src/services/cacheManager.js`)

These services currently return mock data or placeholders. They need to be implemented with actual PDF-to-image conversion logic.

## Known Limitations

1. **Image Processing**: The current implementation uses mock buffers for images. Actual PDF-to-JPG conversion is not implemented.

2. **Page Detection**: The service number finder assumes all matches are on page 1. A real implementation would need to check each page individually.

3. **Caching**: The cache manager is currently a mock and doesn't persist data between runs.

4. **Error Handling**: Basic error handling exists but could be improved for production use.

5. **File Naming**: Output file naming convention is basic and could be enhanced.

## Next Steps / TODO Items

### High Priority
1. Implement actual PDF page extraction in `pageExtractor.js` using `pdf2pic` library
2. Implement image conversion to JPG in `imageGenerator.js` using `sharp` library
3. Implement file saving in `fileManager.js`
4. Implement real caching mechanism in `cacheManager.js` (using better-sqlite3 or file-based cache)

### Medium Priority
1. Improve page detection to return actual page numbers where dienstnummer is found
2. Add support for different image formats (PNG, WebP) via configuration
3. Implement batch processing for multiple dienstnummers
4. Add progress indicators for long-running operations
5. Improve error handling and logging

### Low Priority
1. Add unit tests for all services
2. Create Docker container for easy deployment
3. Add web interface or API wrapper
4. Implement command for listing available dienstnummers in PDFs
5. Add support for PDF password handling (if needed)

## Extending the Project

### Adding New Services
The project follows a modular architecture. To add a new service:
1. Create a new file in `src/services/`
2. Export the required functions
3. Import and use it in `src/cli.js`
4. Update any necessary configuration

### Modifying Existing Services
Each service has a single responsibility:
- `inputValidator.js`: Validates dienstnummer format
- `serviceNumberFinder.js`: Searches PDFs for dienstnummer
- `pageExtractor.js`: Extracts specific pages as images
- `imageGenerator.js`: Converts images to target format
- `fileManager.js`: Saves files to disk
- `cacheManager.js`: Manages caching of results

### Configuration Options
Add new configuration options in:
1. `src/config/default.json`
2. Access them in `src/utils/configLoader.js`
3. Pass them to services as needed

## Testing

### Running Tests
```bash
npm test
```

### Test Files
- Jest is configured as the test framework
- Tests should be placed in `__tests__` directory or files ending with `.test.js`
- Mock filesystem (`mock-fs`) is available for testing file operations

### Current Test Status
- Basic tests exist for pdf-parse functionality
- Service-level tests need to be implemented
- Integration tests for the full workflow are recommended

## Dependencies

### Production Dependencies
- `better-sqlite3`: For caching (planned implementation)
- `commander`: CLI interface
- `config`: Configuration management
- `pdf-parse`: PDF text extraction
- `pdf2pic`: PDF to image conversion (to be implemented)
- `pdfjs-dist`: PDF.js library (dependency of pdf-parse)
- `sharp`: Image processing (to be implemented)

### Development Dependencies
- `jest`: Testing framework
- `mock-fs`: Mock file system for testing

## Troubleshooting

### Common Issues
1. **"pdf is not a function" error**
   - Cause: Incorrect import of pdf-parse
   - Solution: Use `{ PDFParse } = require('pdf-parse')` as shown in the code

2. **Memory issues with large PDFs**
   - Cause: Loading entire PDF into memory
   - Solution: Consider streaming approaches for very large files

3. **Missing output directory**
   - Cause: Output directory doesn't exist
   - Solution: The CLI will attempt to create it, but ensure proper permissions

### Debugging Tips
1. Enable verbose logging by adding `console.log` statements in services
2. Use the `demo.js` script to understand the workflow
3. Check the `find-service-numbers.js` output to see what text is in the PDFs
4. Review the configuration in `src/config/default.json`

## Contact Information

For questions about this project, refer to:
- Project documentation in this handover.md
- Code comments throughout the source files
- Configuration files in src/config/
- The demonstration scripts (demo.js, find-service-numbers.js)

---

*This handoff document was created to help a new developer understand and continue work on the dienst2jpg project.*