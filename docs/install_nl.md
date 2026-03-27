# Installatie Gids voor Dienst2JPG (Nederlands)

## Vereisten voor een Vanilla Linux Systeem

Voordat je begint met de installatie, zorg ervoor dat je systeem aan de volgende minimale vereisten voldoet:

- **Besturingssysteem**: Elk moderne Linux-distributie (Ubuntu, Debian, Fedora, CentOS, etc.)
- **Node.js**: Versie 14.0.0 of hoger
- **npm**: Wordt automatisch geïnstalleerd met Node.js
- **Basis Linux commando's**: Toegang tot een terminal

## Stap-voor-stap Installatie

### Stap 1: Node.js Installeren

Als Node.js nog niet is geïnstalleerd op je systeem, volg dan deze stappen:

#### Voor Ubuntu/Debian gebaseerde systemen:
```bash
# Pakketlijst bijwerken
sudo apt update

# Node.js en npm installeren
sudo apt install -y nodejs npm

# Controleer de geïnstalleerde versies
node --version
npm --version
```

#### Voor Fedora/RHEL/CentOS gebaseerde systemen:
```bash
# Node.js en npm installeren
sudo dnf install -y nodejs npm

# Of voor oudere versies:
# sudo yum install -y nodejs npm

# Controleer de geïnstalleerde versies
node --version
npm --version
```

#### Alternatief: Node.js via NodeSource repository (aanbevolen voor laatste versies)
```bash
# Voeg NodeSource repository toe
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Installeer Node.js
sudo apt-get install -y nodejs

# Controleer versie
node --version
```

### Stap 2: Repository Klonen of Downloaden

#### Optie A: Via Git (aanbevolen)
```bash
# Ga naar de gewenste directory
cd ~/projects

# Clone de repository
git clone https://jouw-repository-url/dienst2jpg.git

# Ga naar de project directory
cd dienst2jpg
```

#### Optie B: Manual Download
1. Download de ZIP-file van de repository
2. Pak het uit naar een directory van jouw keuze
3. Open een terminal en navigeer naar de uitgepakte directory

### Stap 3: Afhankelijkheden Installeren
```bash
# Navigeer naar de project directory (als je dat nog niet hebt gedaan)
cd pad/naar/dienst2jpg

# Installeer alle Node.js afhankelijkheden
npm install

# Dit zal een node_modules directory aanmaken en alle benodigde packages installeren
```

### Stap 4: PDF Bestanden Toevoegen
Voor de applicatie om te functioneren, moet je PDF timetable bestanden plaatsen in de `diensten/` directory:

```bash
# Maak de diensten directory aan (als deze nog niet bestaat)
mkdir -p diensten

# Kopieer je PDF timetable bestanden naar deze directory
# Voorbeeld:
cp /pad/naar/jouw/ZAANDAM_MA-VR.pdf diensten/
cp /pad/naar/jouw/ZAANDAM_ZATERDAG.pdf diensten/
cp /pad/naar/jouw/ZAANDAM_ZONDAG.pdf diensten/
```

De applicatie verwacht PDF bestanden met de volgende naamgevingsconventie:
- `ZAANDAM_MA-VR.pdf`: Maandag-Vrijdag rooster
- `ZAANDAM_ZATERDAG.pdf`: Zaterdag rooster
- `ZAANDAM_ZONDAG.pdf`: Zondag rooster

### Stap 5: Configuratie Controleren (Optioneel)
De applicatie wordt geleverd met een standaard configuratie die in de meeste gevallen werkt. De configuratie bestanden bevinden zich in `src/config/`:

- `src/config/default.json`: Standaard configuratie
- `src/config/custom.json.example`: Voorbeeld van een aangepaste configuratie

Je kunt een aangepaste configuratie maken door:
```bash
cp src/config/custom.json.example src/config/custom.json
```
En vervolgens het bestand aan te passen aan jouw behoeften.

## Hoe de Applicatie te Gebruiken

### Basisgebruik
```bash
# Extraheer pagina's voor een specifiek dienstnummer
node src/cli.js extract V1234
```

### Met Aangepaste Output Directory
```bash
node src/cli.js extract V1234 --output ./mijn-uitvoer
```

### Caching Uitschakelen
```bash
node src/cli.js extract V1234 --cache-enabled false
```

### Aangepaste Cache TTL Instellen
```bash
node src/cli.js extract V1234 --cache-ttl 1800
```

### Beschikbare Commands Bekijken
```bash
node src/cli.js --help
```

## Uitvoer Locatie
Standaard worden de uitgepakte JPG bestanden opgeslagen in de `output/` directory. Je kunt deze locatie wijzigen met de `--output` optie zoals hierboven getoond.

## Probleemoplossing

### Veelvoorkomende Problemen en Oplossingen

1. **"command not found: node"**
   - Oorzaak: Node.js is niet geïnstalleerd of niet in je PATH
   - Oplossing: Installeer Node.js volgens de stappen hierboven

2. **Fout bij npm install**
   - Oorzaak: Ontbrekende build tools of permissieproblemen
   - Oplossing op Ubuntu/Debian: `sudo apt install -y build-essential`
   - Oplossing: Probeer opnieuw met `npm install --unsafe-perm` als je permissieproblemen hebt

3. **Geen PDF bestanden gevonden**
   - Oorzaak: PDF bestanden staan niet in de juiste directory of hebben verkeerde namen
   - Oplossing: Controleer of de bestanden in de `diensten/` directory staan met de juiste namen

4. **Geen dienstnummer gevonden in PDF**
   - Oorzaak: Het dienstnummer bestaat niet in de PDF bestanden of heeft een ongeldig formaat
   - Oplossing: Controleer het dienstnummer formaat (moet zijn zoals V1234, D5678, etc.) en controleer of het voorkomt in jouw PDF bestanden

### Logs en Debugging
Voor meer gedetailleerde output kun je omgevingsvariabelen gebruiken:
```bash
DEBUG=* node src/cli.js extract V1234
```

## Onderhoud en Updates

### Het Project Updaten
Als je de repository hebt gekloond met Git:
```bash
# Haal de laatste wijzigingen op
git pull

# Installeer eventuele nieuwe afhankelijkheden
npm install
```

### Cache Wissen
Als je problemen ondervindt met gecachte resultaten:
```bash
# Verwijder de cache directory
rm -rf ./cache

# Of start de applicatie met caching uitgeschakeld voor een enkele run
node src/cli.js extract V1234 --cache-enabled false
```

## Veiligheidsaantekeningen

- Deze applicatie verwerkt alleen lokale bestanden en maakt geen externe netwerkverbindingen
- Zorg ervoor dat je alleen vertrouwde PDF bestanden plaatst in de `diensten/` directory
- Regelmatig updaten van Node.js en npm packages wordt aanbevolen voor beveiligingspatches

## Licentie
Dit project is gelicenseerd onder de ISC licentie. Zie het LICENSE bestand voor meer details.

---
*Laatst bijgewerkt: $(date)*