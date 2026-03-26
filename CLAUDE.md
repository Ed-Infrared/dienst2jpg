# CLAUDE.md

Dit bestand biedt richtlijnen aan Claude Code (claude.ai/code) bij het werken met code in deze repository.

## Repository Overzicht

 Deze repository bevat openbaar vervoer rooster PDF's voor Zaandam:
- `ZAANDAM_MA-VR.pdf`: Maandag-Vrijdag rooster
- `ZAANDAM_ZATERDAG.pdf`: Zaterdag rooster
- `ZAANDAM_ZONDAG.pdf`: Zondag rooster

## Ontwikkelingswerkstroom

### Gemeenschappelijke Commando's
- Bekijk rooster PDF's: Gebruik elke PDF viewer
- Voeg nieuwe roosters toe: Kopieer PDF bestanden naar de `diensten/` directory
- Verwijder verouderde roosters: Verwijder bestanden uit `diensten/`

### Git Werkstroom
- Commit berichten in het Engels, imperatief (bijv. "Add timetable" niet "Added timetable")
- Alle nieuwe bestanden dienen toegevoegd te worden aan git voor tracking (met uitzondering van ./tmp folder en bestanden met gevoelige informatie zoals credentials)
- Als je in een folder staat waar src in het path voorkomt en die folder is nog geen onderdeel van een git repo, vraag de gebruiker dan of je er een git repo van kunt maken en wat de root van de repo moet zijn
- Lees altijd bestanden voordat je schrijft
- Als bestanden niet bestaan, maak eerst een leeg bestand

## Bestand Conventies

### PDF bestanden
- Bewaar alle timetable PDF's in de `diensten/` directory
- Gebruik beschrijvende bestandsnamen die locatie en schema type aangeven
- Behoud consistente naamgevings patroon: `LOCATION_TYPE.pdf`

### Documentatie
- Houd documentatie in het Engels voor code comments
- Reageer op de gebruiker in het Nederlands zoals vermeld in de globale voorkeuren