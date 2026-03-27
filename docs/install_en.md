# Installation Guide for Dienst2JPG (English)

## Requirements for a Vanilla Linux System

Before beginning installation, ensure your system meets the following minimum requirements:

- **Operating System**: Any modern Linux distribution (Ubuntu, Debian, Fedora, CentOS, etc.)
- **Node.js**: Version 14.0.0 or higher
- **npm**: Automatically installed with Node.js
- **Basic Linux Commands**: Access to a terminal

## Step-by-Step Installation

### Step 1: Install Node.js

If Node.js is not yet installed on your system, follow these steps:

#### For Ubuntu/Debian-based systems:
```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install -y nodejs npm

# Check installed versions
node --version
npm --version
```

#### For Fedora/RHEL/CentOS-based systems:
```bash
# Install Node.js and npm
sudo dnf install -y nodejs npm

# Or for older versions:
# sudo yum install -y nodejs npm

# Check installed versions
node --version
npm --version
```

#### Alternative: Node.js via NodeSource repository (recommended for latest versions)
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Check version
node --version
```

### Step 2: Clone or Download the Repository

#### Option A: Via Git (recommended)
```bash
# Navigate to desired directory
cd ~/projects

# Clone the repository
git clone https://your-repository-url/dienst2jpg.git

# Navigate to project directory
cd dienst2jpg
```

#### Option B: Manual Download
1. Download the ZIP file from the repository
2. Extract it to a directory of your choice
3. Open a terminal and navigate to the extracted directory

### Step 3: Install Dependencies
```bash
# Navigate to project directory (if you haven't already)
cd path/to/dienst2jpg

# Install all Node.js dependencies
npm install

# This will create a node_modules directory and install all required packages
```

### Step 4: Add PDF Files
For the application to function, you need to place PDF timetable files in the `diensten/` directory:

```bash
# Create the diensten directory (if it doesn't exist)
mkdir -p diensten

# Copy your PDF timetable files to this directory
# Example:
cp /path/to/your/ZAANDAM_MA-VR.pdf diensten/
cp /path/to/your/ZAANDAM_ZATERDAG.pdf diensten/
cp /path/to/your/ZAANDAM_ZONDAG.pdf diensten/
```

The application expects PDF files with the following naming convention:
- `ZAANDAM_MA-VR.pdf`: Monday-Friday timetable
- `ZAANDAM_ZATERDAG.pdf`: Saturday timetable
- `ZAANDAM_ZONDAG.pdf`: Sunday timetable

### Step 5: Verify Configuration (Optional)
The application ships with a default configuration that works in most cases. Configuration files are located in `src/config/`:

- `src/config/default.json`: Default configuration
- `src/config/custom.json.example`: Example of a custom configuration

You can create a custom configuration by:
```bash
cp src/config/custom.json.example src/config/custom.json
```
Then edit the file to suit your needs.

## How to Use the Application

### Basic Usage
```bash
# Extract pages for a specific dienstnummer
node src/cli.js extract V1234
```

### With Custom Output Directory
```bash
node src/cli.js extract V1234 --output ./my-output
```

### Disable Caching
```bash
node src/cli.js extract V1234 --cache-enabled false
```

### Set Custom Cache TTL
```bash
node src/cli.js extract V1234 --cache-ttl 1800
```

### View Available Commands
```bash
node src/cli.js --help
```

## Output Location
By default, extracted JPG files are saved in the `output/` directory. You can change this location using the `--output` option as shown above.

## Troubleshooting

### Common Problems and Solutions

1. **"command not found: node"**
   - Cause: Node.js is not installed or not in your PATH
   - Solution: Install Node.js following the steps above

2. **Error during npm install**
   - Cause: Missing build tools or permission issues
   - Solution on Ubuntu/Debian: `sudo apt install -y build-essential`
   - Solution: Try again with `npm install --unsafe-perm` if you have permission issues

3. **No PDF files found**
   - Cause: PDF files are not in the correct directory or have incorrect names
   - Solution: Verify files are in the `diensten/` directory with correct names

4. **No dienstnummer found in PDF**
   - Cause: The dienstnummer doesn't exist in PDF files or has invalid format
   - Solution: Check dienstnummer format (must be like V1234, D5678, etc.) and verify it exists in your PDF files

### Logs and Debugging
For more detailed output, use environment variables:
```bash
DEBUG=* node src/cli.js extract V1234
```

## Maintenance and Updates

### Updating the Project
If you cloned the repository with Git:
```bash
# Get latest changes
git pull

# Install any new dependencies
npm install
```

### Clearing Cache
If you experience issues with cached results:
```bash
# Remove cache directory
rm -rf ./cache

# Or run application with caching disabled for a single run
node src/cli.js extract V1234 --cache-enabled false
```

## Security Notes

- This application processes only local files and makes no external network connections
- Ensure you only place trusted PDF files in the `diensten/` directory
- Regularly updating Node.js and npm packages is recommended for security patches

## License
This project is licensed under the ISC license. See the LICENSE file for more details.

---
*Last updated: $(date)*