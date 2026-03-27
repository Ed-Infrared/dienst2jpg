# Disclaimer

This project is generated with:\
Claude-Code 2.1.85\
model nvidia/nemotron-3-super-120b-a12b:free


# PDF Dienstnummer Extractor

A Node.js application that extracts PDF pages based on dienstnummer (service number) and saves them as JPG files. The application features external configuration, SQLite caching, and a modular architecture for reusability.

## Features

- Extracts specific pages from PDF files based on dienstnummer
- Saves extracted pages as high-quality JPG images
- External configuration via JSON files
- SQLite-based caching for performance
- Modular architecture with separate services for each concern
- Comprehensive test suite
- CLI interface with helpful error messages

## Installation

```bash
npm install
```

## Usage

### Basic Usage

Extract pages for a specific dienstnummer:

```bash
node src/cli.js extract V1234
```

### With Custom Output Directory

```bash
node src/cli.js extract V1234 --output ./my-output
```

### Caching Options

Disable caching:

```bash
node src/cli.js extract V1234 --cache-enabled false
```

Set custom cache TTL (time to live) in seconds:

```bash
node src/cli.js extract V1234 --cache-ttl 1800
```

### Help

View available commands and options:

```bash
node src/cli.js --help
```

## Configuration

The application uses external configuration files located in `src/config/`.

### Default Configuration (`src/config/default.json`)

```json
{
  "pdfDirectory": "./diensten",
  "outputDirectory": "./output",
  "cacheEnabled": true,
  "cacheTtl": 3600,
  "sharp": {
    "quality": 80
  }
}
```

### Configuration Options

- `pdfDirectory`: Directory containing PDF timetable files
- `outputDirectory`: Directory where extracted JPG files will be saved
- `cacheEnabled`: Enable or disable caching (true/false)
- `cacheTtl`: Cache time-to-live in seconds
- `sharp.quality`: Image quality for JPG output (1-100)

## How It Works

1. **Input Validation**: Validates the dienstnummer format (V|D|D2|G|P|X followed by exactly 4 digits)
2. **Service Number Finder**: Searches PDF files in the configured directory for the specified dienstnummer
3. **Page Extractor**: Extracts the specified pages from matching PDF files
4. **Image Generator**: Converts extracted pages to JPG format
5. **File Manager**: Saves JPG files to the output directory
6. **Cache Manager**: Optionally caches results to avoid reprocessing the same dienstnummer

## Project Structure

```
src/
├── config/                 # Configuration files
│   ├── default.json        # Default configuration
│   └── custom.json.example # Example custom configuration
├── services/               # Service modules
│   ├── inputValidator.js   # Validates dienstnummer format
│   ├── serviceNumberFinder.js # Finds dienstnummer in PDFs
│   ├── pageExtractor.js    # Extracts pages from PDF
│   ├── imageGenerator.js   # Converts images to JPG
│   ├── fileManager.js      # Saves JPG files
│   └── cacheManager.js     # Handles caching with SQLite
├── utils/                  # Utility functions
│   ├── configLoader.js     # Loads and validates configuration
│   └── helpers.js          # Helper functions
├── cli.js                  # Command-line interface
└── index.js                # Entry point

tests/
├── unit/                   # Unit tests
└── integration/            # Integration tests
```

## Running Tests

### Unit Tests

```bash
npm test
```

### Specific Test Suites

```bash
# Run only unit tests
npm test -- tests/unit/

# Run only integration tests
npm test -- tests/integration/
```

## Example Workflow

1. Place your PDF timetable files in the `diensten/` directory
2. Run the application with a dienstnummer: `node src/cli.js extract V1234`
3. The application will search through all PDFs for the dienstnummer
4. If found, it will extract the matching pages and save them as JPG files in the `output/` directory
5. Results are cached for faster subsequent lookups (if caching is enabled)

## Requirements

- Node.js >= 14.0.0
- PDF files with dienstnummer information in the format "V1234", "D5678", etc.

## License

ISC
