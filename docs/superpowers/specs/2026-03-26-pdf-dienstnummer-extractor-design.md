# FSD: PDF Dienstnummer Extractor

## Overzicht
Dit project heeft als doel om aan de hand van een opgegeven dienstnummer (format: V|D|D2|G|P|X + 4 cijfers) de corresponderende bladzijde(n) uit PDF bestanden te vinden en deze op te slaan als JPG bestanden.

## Functionele Vereisten

### Input
- Dienstnummer als command-line argument of via stdin
- Dienstnummer moet voldoen aan patroon: `[V|D|D2|G|P|X]+[0-9]{4}` (bijv. V1234, D5678, D21234, G9876, P5432)

### Verwerking
1. **Input Validatie**: Controleer of het dienstnummer voldoet aan het verwachte formaat
2. **PDF Zoeken**: Doorzoek alle PDF bestanden in de `diensten/` directory naar het dienstnummer
   - Zoek naar patroon "Dienst: [dienstnummer]" in de PDF tekst
   - Het dienstnummer staat altijd in een apart vak vermeld samen met "Dienst:" en staat altijd redelijk bovenaan
3. **Pagina Identificatie**: Bepaal op welke pagina(n) het dienstnummer wordt gevonden
4. **PDF naar Afbeelding**: Converteer de geïdentificeerde pagina(n) naar hoge kwaliteit JPG afbeeldingen
5. **Bestand Opslaan**: Sla de JPG bestanden op in een output directory met een duidelijke bestandsnaam

### Output
- JPG bestand(en) met de corresponderende pagina(n) van de PDF
- Bestandsnaam formaat: `[dienstnummer]_pagina_[paginanummer].jpg`
- Bij meerdere pagina's: één JPG per pagina

## Niet-functionele Vereisten

### Prestaties
- Cache mechanisme om herhaalde queries op dezelfde dienstnummer snel te beantwoorden
- Efficiënte PDF parsing zonder geheugenoverbelasting bij grote bestanden

### Betrouwbaarheid
- Uitgebreide foutafhandeling met duidelijke foutmeldingen
- Graceful degradation bij ontbrekende of corrupt PDF bestanden
- Validatie van alle input en output

### Onderhoudbaarheid
- Modulaire architectuur met duidelijke scheiding van verantwoordelijkheden
- Goed gedocumenteerde interfaces tussen componenten
- Uitgebreide testdekking

## Technische Specificaties

### Technologie Stack
- **Taal**: Node.js (versie >=16)
- **PDF Tekst Extractie**: `pdf-parse` bibliotheek
- **PDF naar Afbeelding Conversie**: `pdf2pic` of `pdf-poppler` (gebaseerd op Poppler)
- **Afbeelding Optimalisatie**: `sharp` bibliotheek (optioneel voor kwaliteit aanpassing)
- **Caching**: SQLite database met Prisma ORM
- **CLI Framework**: `commander.js` voor argument parsing en help tekst
- **Configuratie**: Vereist extern configuratie bestand (JSON, YAML of TOML) - geen hardcoded defaults of environment variables als fallback
- **Testing**: `jest` voor unit en integratie tests

### Architectuur
Het systeem bestaat uit de volgende lagen:

1. **Configuratie Laad Laad**: Laadt configuratie uit externe bestanden (config/default.json, config/custom.{json,yaml,toml}, environment variables)
2. **CLI Interface**: Verzorgt command-line interface en argument parsing (alleen voor standalone gebruik)
3. **Core Bibliotheek**: Herbruikbare set modules die de functionaliteit biedt:
   - **Input Validator**: Valideert dienstnummer formaat
   - **Service Number Finder**: Zoekt dienstnummer in PDF bestanden
   - **Page Extractor**: Extrahert specifieke pagina's uit PDF
   - **Image Generator**: Converteert PDF pagina's naar JPG
   - **File Manager**: Beheert bestandssysteem operaties (lezen, schrijven, paden)
   - **Cache Manager**: Beheert caching van zoekresultaten
4. **Utils**: Helper functies die gebruikt worden door verschillende modules

De Core Bibliotheek is zo ontworpen dat deze gemakkelijk kan worden opgenomen in andere projecten. Andere projecten kunnen de Core Bibliotheek importeren en de functies aanroepen met hun eigen configuratie.

### Component Interfaces

Alle modules in de Core Bibliotheek accepteren configuratie waar nodig via parameters, waardoor ze onafhankelijk werken van harde-coded waarden.

#### InputValidator
```javascript
// Input: dienstnummer string
// Output: boolean (true if valid)
function validate(serviceNumber: string): boolean
```

#### ServiceNumberFinder
```javascript
// Input: dienstnummer string, pad naar PDF directory
// Output: array van objecten met {filePath: string, pageNumbers: number[]}
function find(serviceNumber: string, pdfDirectory: string): Array<{filePath: string, pageNumbers: number[]}>
```

#### PageExtractor
```javascript
// Input: PDF file path, array of page numbers
// Output: array van afbeeldingsbuffers (of afbeeldingsobjecten)
function extract(pdfPath: string, pageNumbers: number[]): Promise<Array<Buffer>>
```

#### ImageGenerator
```javascript
// Input: array van afbeeldingsbuffers, output directory, basis bestandsnaam
// Output: array van paden naar gegenereerde JPG bestanden
function generate(images: Array<Buffer>, outputDir: string, baseName: string): Promise<Array<string>>
```

#### FileManager
```javascript
// Input: bestand data, bestandspad
// Output: geen (of error bij falen)
function save(data: Buffer, filePath: string): void
```

#### CacheManager
```javascript
// Input: cache key
// Output: gecachede waarde of undefined
function get(key: string): any

// Input: cache key, waarde, TTL in seconden
// Output: geen
function set(key: string, value: any, ttl: number): void
```

### Voorbeeld Gebruik als Bibliotheek
Andere projecten kunnen de core functionaliteit als volgt gebruiken:

```javascript
// Importeren van de benodigde modules
const {
  validateServiceNumber,
  findServiceNumberInPdfs,
  extractPagesAsImages,
  convertImagesToJpg,
  saveJpgFiles
} = require('./dienst2jpg-core');

// Of alternatief, een hoofd-functie die de hele workflow afhandelt
const { extractAndSaveJpgByServiceNumber } = require('./dienst2jpg-core');

// Met expliciete configuratie
const result = await extractAndSaveJpgByServiceNumber('V1234', {
  pdfDirectory: './diensten',
  outputDirectory: './output',
  cacheEnabled: true,
  cacheTtl: 3600
});
```

### Foutafhandeling
Het systeem hanteert de volgende foutscenario's met specifieke fouttypes:

1. **InvalidServiceNumberError**: Dienstnummer komt niet overeen met verwacht patroon. Deze fout moet de optie bieden om een eventueel nieuw format te integreren zonder bestaande functionaliteit te breken.
2. **ServiceNumberNotFoundError**: Dienstnummer niet gevonden in enige PDF
3. **PdfNotFoundError**: Gespecificeerd PDF bestand niet gevonden
4. **PdfParseError**: Fout bij het parsen van PDF tekst
5. **PageOutOfRangeError**: Gespecificeerd paginanummer buiten bereik van PDF
6. **ImageConversionError**: Fout bij het converteren van PDF pagina naar afbeelding
7. **FileSystemError**: Fout bij lezen/schrijven van bestanden
8. **CacheError**: Fout bij cache operaties

Alle fouten bevatten duidelijke boodschappen voor eindgebruikers en worden geloggd voor ontwikkelaars.

## Test Strategie

### Unit Tests (80%)
- Elke module getest in isolatie met mocks voor dependencies
- Input validatie tests (geldige en ongeldige dienstnummers)
- Zoekalgoritme tests met verschillende PDF tekst scenarios
- Pagina extractie tests
- Afbeelding conversie tests
- Cache get/set operaties
- Foutafhandeling scenarios

### Integratie Tests (15%)
- Samenwerking tussen modules (bijv. Finder + Extractor)
- Data flow validatie van input tot output
- Cache functionaliteit in context van volledige workflow
- Foutpropagatie tussen modules

### Systeem Tests (5%)
- End-to-end workflows met echte PDF bestanden
- CLI interface validatie (argument parsing, help tekst)
- Output formaat verificatie (JPG kwaliteit, bestandsnamen)
- Performance benchmarks met verschillende PDF groottes
- Concurrentie testen (meerdere simultane requests)

## Project Structuur
```
dienst2jpg/
├── diensten/                 # PDF bron bestanden
├── docs/                     # Documentatie
│   └── superpowers/
│       └── specs/            # Design specificaties
├── src/                      # Broncode
│   ├── cli.js                # Command line interface
│   ├── services/
│   │   ├── inputValidator.js
│   │   ├── serviceNumberFinder.js
│   │   ├── pageExtractor.js
│   │   ├── imageGenerator.js
│   │   ├── fileManager.js
│   │   └── cacheManager.js
│   └── utils/                # Helper functies
├── tests/                    # Test bestanden
│   ├── unit/
│   ├── integration/
│   └── system/
├── output/                   # Gegenereerde JPG bestanden (gitignored)
├── .superpowers/             # Brainstorming sessie data (gitignored)
├── package.json
├── README.md
└── CLAUDE.md                 # Richtlijnen voor Claude Code
```

## Uitvoering
Het systeem kan worden uitgevoerd als:
```bash
node src/cli.js --service V1234
```
Of:
```bash
echo "V1234" | node src/cli.js
```

## Toekomstige Uitbreidingen
- Ondersteuning voor andere output formaten (PNG, PDF)
- Web interface voor interactief gebruik
- Batch verwerking van meerdere dienstnummers
- Meer geavanceerde zoekalgoritmen (fuzzy matching)
- Internationale ondersteuning (verschillende talen in PDF's)