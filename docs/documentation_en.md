# Dienst2JPG Documentation

## Overview

This repository contains public transport timetable PDFs for Zaandam:
- `ZAANDAM_MA-VR.pdf`: Monday-Friday timetable
- `ZAANDAM_ZATERDAG.pdf`: Saturday timetable
- `ZAANDAM_ZONDAG.pdf`: Sunday timetable

## Development Workflow

### Common Commands
- View timetable PDFs: Use any PDF viewer
- Add new timetables: Copy PDF files to the `diensten/` directory
- Remove outdated timetables: Delete files from `diensten/`

### Git Workflow
- Commit messages in English, imperative (e.g., "Add timetable" not "Added timetable")
- All new files should be added to git for tracking (except ./tmp folder and files with sensitive information like credentials)
- If you're in a folder where src appears in the path and that folder is not yet part of a git repo, ask the user if you can make it a git repo and what the root of the repo should be
- Always read files before writing
- If files don't exist, create an empty file first

## File Conventions

### PDF files
- Store all timetable PDFs in the `diensten/` directory
- Use descriptive filenames that indicate location and schedule type
- Maintain consistent naming pattern: `LOCATION_TYPE.pdf`

### Documentation
- Keep documentation in English for code comments
- Respond to the user in Dutch as mentioned in global preferences