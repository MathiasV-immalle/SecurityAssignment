# Assignment SecurityTesting

## Opgave
[Opgave](https://apwt.gitbook.io/software-security/assignment/000general/003assignment3)

## Locatie taak
[Website](https://security-assignment-ap2020.herokuapp.com/)

## Beschrijving
> Applicatie waarbij men zichzelf kan registreren met een gebruikersnaam en wachtwoord. Nadien is het ook mogelijk om aan te melden.
- De applicatie bestaat uit 3 pagina's:
  - Register: register-functie
  - Signin: sign in-functie
  - Home: geeft info over de ingelogde persoon
- Het programma is geschreven in JavaScript, HTML, CSS
- Gebruikte editor: Visual Studio Code
- Gebruikte database: MongoDB
- Hosting: Heroku

### Registreren
Bij het registreren wordt er naar een gebruikersnaam en wachtwoord gevraagd. Eerst wordt er gekeken of er al een persoon in de MongoDB database bestaat met dezelfde gebruikersnaam. Wanneer dit het geval is, krijgt de gebruiker dit als melding te zien. We vragen ook om het wachtwoord tweemaal in te geven zodat de gebruiker niet per ongeluk een fout wachtwoord ingeeft. Daarna onderwerpen we het wachtwoord aan enkele controles.

We controleren het wachtwoord eerst op de regels die voorgesteld worden op [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html). Zo moet de gebruiker bijvoorbeeld een wachtwoord ingeven dat minstens 8 karakters lang is. 

Daarna wordt het wachtwoord gehashed (via sha1) en wordt het gecontroleerd aan de hand van [haveibeenpwned](https://haveibeenpwned.com/) om te kijken of het wachtwoord niet in een data breach zit. Wanneer dat het geval is zal dit aan de gebruiker gemeld worden. Dit gebeurt door een API call te doen met de hash prefix. Hierdoor krijgen we een lijst van hash suffix's terug. Hierop word dan gezocht naar het wachtwoord.

Wanneer het wachtwoord veilig genoeg is, wordt het gehashed met bcrypt. Daarna wordt er een nieuw object aangemaakt in de MongoDB database met de gegeven gebruikersnaam en het gehashte wachtwoord. Met die credentials kan de gebruiker dan nadien inloggen.

Als er naar de registratie-pagina wordt gesurft terwijl er een sessie actief is, wordt er doorverwezen naar de Home-pagina. De gebruikersnaam wordt doorgegeven.

### Inloggen
Bij het inloggen wordt er gevraagd naar een gebruikersnaam en een wachtwoord. We zoeken dan in de MongoDB database naar een gebruiker met dezelfde gebruikersnaam. Wanneer die niet bestaat krijgt de gebruiker een melding. Wanneer hij wel bestaat wordt het ingegeven wachtwoord gehashed (via bcrypt) en vergeleken met het opgeslagen wachtwoord. Wanneer deze gelijk zijn, wordt de gebruiker aangemeld en naar de Home-pagina doorgewezen.

Als er naar de login-pagina wordt gesurft terwijl er een sessie actief is, wordt er doorverwezen naar de Home-pagina. De gebruikersnaam wordt doorgegeven.

### Home
Deze pagina geeft enkel de gebruikersnaam weer van de persoon die ingelogd is. In praktijk zou dit uitgebreid kunnen worden. Momenteel bestaat deze pagina enkel om de werking van het login-systeem te visualiseren, te testen en te coveren.

## Development steps

- html + css (inlog form van bootstrap)
- database gelinkt (lokaal) met MongoDB
- overgeschakeld naar express.js app
- registerfunctie gemaakt
- inlogfunctie gemaakt
- code (hashing (sha-1 + wachtwoord tot de vereisten voldoet))
- api call naar de [haveibeenpwned](https://haveibeenpwned.com/)
- error-pagina's gemaakt
- database online gezet met MongoDB
- project gehost met Heroku
- AP logo toegevoegd
- sessions toegevoegd
- bcrypt ipv. sha1 voor te encrypteren

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
- [Enzoic](https://www.enzoic.com/docs-passwords-api/)
- [Npmjs](https://www.npmjs.com)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [session](https://www.npmjs.com/package/express-session)
  - [fetch](https://www.npmjs.com/package/node-fetch)
  - [randomstring](https://www.npmjs.com/package/randomstring)
  - [Mongodb](https://www.npmjs.com/package/mongodb)
- [Nodejs](https://nodejs.org/en/)
- [Google](https://www.google.com/)
- [Github](https://github.com/)
- [Test SHA1 hashing](http://www.sha1-online.com/)
- [Hashing algoritme](https://coursesweb.net/javascript/sha1-encrypt-data_cs)

## Gebruikte programma's
- [Visual Studio Code](https://code.visualstudio.com/)
  - [VSCode Liveshare](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack)
- [MongoDB](https://www.mongodb.com/)
  - [MongoDB Cloud](https://account.mongodb.com/account/login)
- [Heroku](https://www.heroku.com/)
- [Git bash](https://git-scm.com/downloads)
- [Github desktop](https://desktop.github.com/)