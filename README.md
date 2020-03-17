# Assignment SecurityTesting

## Opgave
[De opgave](https://apwt.gitbook.io/software-security/assignment/000general/003assignment3)

## Locatie taak
[Onze website](https://security-assignment-ap2020.herokuapp.com/)

## Beschrijving
Applicatie waarbij men zichzelf kan registreren met een gebruikersnaam en wachtwoord. Nadien is het ook mogelijk om aan te melden.

- De applicatie bestaat uit 3 pagina's:
  - Register: register-functie
  - Signin: sign in-functie
  - Home: geeft info over de ingelogde persoon
- Het programma is geschreven in JavaScript, HTML, CSS
- Gebruikte editor: Visual Studio Code
- Gebruikte database: MongoDB
- Gebruikte technologie: Express.js
- Hosting: Heroku

### Registreren
Bij het registreren wordt er naar een gebruikersnaam en wachtwoord gevraagd. Eerst wordt er gekeken of er al een persoon in de MongoDB database bestaat met dezelfde gebruikersnaam. Wanneer dit het geval is, krijgt de gebruiker dit als melding te zien. We vragen ook om het wachtwoord tweemaal in te geven zodat de gebruiker niet per ongeluk een fout wachtwoord ingeeft. Daarna onderwerpen we het wachtwoord aan enkele controles.

We controleren het wachtwoord eerst op de regels die voorgesteld worden op [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html). Zo moet de gebruiker bijvoorbeeld een wachtwoord ingeven dat minstens 8 karakters lang is. 

Daarna wordt het wachtwoord gehashed (via SHA-1) en wordt het gecontroleerd aan de hand van [haveibeenpwned](https://haveibeenpwned.com/) om te kijken of het gehashte wachtwoord niet in een data breach zit. Wanneer dat het geval is zal dit aan de gebruiker gemeld worden. Dit gebeurt door een API call te doen met de hash prefix. Hierdoor krijgen we een lijst van hash suffix's terug. Hierop word dan gezocht naar het gehashte wachtwoord.

Wanneer het wachtwoord veilig genoeg is en dus aan alle vereisten voldoet, wordt het ingegeven wachtwoord gehashed met bcrypt. Daarna wordt er een nieuw object aangemaakt in de MongoDB database met de gegeven gebruikersnaam en het met bcrypt gehashte wachtwoord. De gebruiker zal automatisch ingelogd zijn. Nadien kan hij inloggen met het ingegeven wachtwoord en gebruikersnaam (zie login).

Als er naar de registratie-pagina wordt gesurft terwijl er een sessie actief is, wordt er doorverwezen naar de Home-pagina. De gebruikersnaam wordt doorgegeven als ID voor de sessie.

### Inloggen
Bij het inloggen wordt er gevraagd naar een gebruikersnaam en een wachtwoord. We zoeken dan in de MongoDB database naar een gebruiker met dezelfde gebruikersnaam. Wanneer die niet bestaat krijgt de gebruiker een melding. Wanneer hij wel bestaat wordt het ingegeven wachtwoord gehashed via bcrypt en vergeleken met het opgeslagen wachtwoord. Wanneer deze gelijk zijn, wordt de gebruiker aangemeld en naar de Home-pagina doorgewezen.

Als er naar de login-pagina wordt gesurft terwijl er een sessie actief is, wordt er doorverwezen naar de Home-pagina. De gebruikersnaam wordt doorgegeven als ID voor de sessie.

### Home
Deze pagina geeft enkel de gebruikersnaam weer van de persoon die ingelogd is. In praktijk zou dit uitgebreid kunnen worden. Momenteel bestaat deze pagina enkel om de werking van het login-systeem te visualiseren en te testen.

## Extra ideeën die buiten de scope vallen
- Wanneer de gebruiker zijn wachtwoord vergeet, wordt er een e-mail verstuurd om het wachtwoord te resetten.
  - E-mailadres vragen bij registratie en mee opslagen in de database (al dan niet gehashed)
- Na vijf verkeerde pogingen om aan te melden wordt er een e-mail verstuurd naar de gebruiker om het wachtwoord te resetten. Het account wordt geblokkeerd.
  - E-mailadres vragen bij registratie en mee opslagen in de database (al dan niet gehashed)
  - Aantal penalties voor het aanmelden van dat account wordt bijgehouden in een teller, wordt bij succesvol aanmelden weer op nul gezet
  - Programma staat gebruiker niet meer toe om aan te melden met dat account tot het wachtwoord is veranderd via de e-mail.
- Two Factor Authentication (2FA) toevoegen aan de hand van emailadres, gsm-nummer, code voor Google Authenticator en/of beveiligingsvragen.
  - E-mailadres, gsm-nummer en/of beveiligingsvragen (en antwoorden) opslagen in de database (al dan niet gehashed)

## Development steps
- HTML + CSS (inlog form van bootstrap)
- Database gelinkt (lokaal) met MongoDB
- Overgeschakeld naar express.js app
- Registerfunctie gemaakt
- Inlogfunctie gemaakt
- Code hashing (SHA-1 + wachtwoord tot de vereisten voldoet)
- API call naar de [haveibeenpwned](https://haveibeenpwned.com/) API
- Error-pagina's gemaakt
- Database online gezet met MongoDB
- Project gehost met Heroku
- AP logo toegevoegd
- Sessions toegevoegd
- Bcrypt ipv. SHA-1 voor te encrypteren
- Debug sessions

## Gebruikte bronnen
- [Haveibeenpwned](https://haveibeenpwned.com/)
- [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [Howsecureismypassword](https://howsecureismypassword.net/)
- [Bootstrap](https://getbootstrap.com/)
- [StackOverflow](https://stackoverflow.com/)
- [W3schools](https://www.w3schools.com/)
- [YouTube](https://www.youtube.com/)
  - [Session Authentication in Express](https://www.youtube.com/watch?v=OH6Z0dJ_Huk&t=1s)
- [MDN Web Docs](https://developer.mozilla.org/nl/)
- [Npmjs](https://www.npmjs.com)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [session](https://www.npmjs.com/package/express-session)
  - [fetch](https://www.npmjs.com/package/node-fetch)
  - [randomstring](https://www.npmjs.com/package/randomstring)
  - [MongoDB](https://www.npmjs.com/package/mongodb)
- [Nodejs](https://nodejs.org/en/)
- [Google](https://www.google.com/)
- [Github](https://github.com/)
- [Test SHA1 hashing](http://www.sha1-online.com/)
- [Hashing algoritme](https://coursesweb.net/javascript/sha1-encrypt-data_cs)

## Gebruikte programma's
- [Visual Studio Code](https://code.visualstudio.com/)
  - [VSCode Liveshare](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack)
- [MongoDB Compass](https://www.mongodb.com/)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Heroku](https://www.heroku.com/)
- [Git bash](https://git-scm.com/downloads)
- [Github desktop](https://desktop.github.com/)