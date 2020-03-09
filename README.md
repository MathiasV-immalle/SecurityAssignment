# Assignment SecurityTesting

## Opgave
[Opgave](https://apwt.gitbook.io/software-security/assignment/000general/003assignment3)

## Beschrijving:
> Applicatie waarbij men zichzelf kan registreren met een gebruikersnaam en wachtwoord. Nadien is het ook mogelijk om aan te melden.
- De applicatie bestaat uit 3 pagina's:
  - Register: register-functie
  - Signin: sign in-functie
  - Home: geeft info over de ingelogde persoon
- Het programma is geschreven in javascript, html, css
- Gebruikte editor: Visual Studio Code
- Gebruikte database: MongoDB

### Registreren
Bij het registreren wordt er naar een gebruikersnaam en wachtwoord gevraagd. Eerst wordt er gekeken of er al een persoon in de mongodb bestaat met dezelfde gebruikersnaam. Wanneer dat het geval is, krijgt de gebruiker dit als melding te zien. Anders wordt het wachtwoord gehashed en wordt het gecontroleerd. Het controleren doen we aan de hand van [haveibeenpwned](https://haveibeenpwned.com/) om te kijken of het wachtwoord veilig genoeg is. Daarnaast houden we ons ook aan de regels die voorgesteld worden op [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html). Zo moet de gebruiker bijvoorbeeld een wachtwoord ingeven dat minstens 8 karakters lang is. We vragen ook om het wachtwoord tweemaal in te geven zodat de gebruiker niet per ongeluk een fout wachtwoord ingeeft. Wanneer alles juist is, wordt er een nieuw object aangemaakt in de mongodb met de gegeven gebruikersnaam en het gehashte wachtwoord

### Inloggen
Bij het inloggen wordt er gevraagd naar een gebruikersnaam en een wachtwoord. We zoeken dan in de database naar een gebruiker met dezelfde gebruikersnaam. Wanneer die niet bestaat krijgt de gebruiker een melding. Wanneer hij wel bestaat wordt het ingegeven wachtwoord gehashed en vergeleken met het opgeslagen wachtwoord. Wanneer deze gelijk zijn, wordt de gebruiker aangemeld en naar de Home-pagina doorgewezen.

### Home
Deze pagina geeft enkel de gebruikersnaam weer van de persoon die ingelogd is. In praktijk zou dit uitgebreid kunnen worden. Momenteel bestaat deze pagina enkel om de werking van het login-systeem te visualiseren, te testen en te coveren.

## Gebruikte bronnen
- [Haveibeenpwned](https://haveibeenpwned.com/)
- [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [Howsecureismypassword](https://howsecureismypassword.net/)
- [Bootstrap](https://getbootstrap.com/)
- [StackOverflow](https://stackoverflow.com/)
- [W3schools](https://www.w3schools.com/)
- [YouTube](https://www.youtube.com/)
- [MDN Web Docs](https://developer.mozilla.org/nl/)
- [Enzoic](https://www.enzoic.com/docs-passwords-api/)
- [Npmjs](https://www.npmjs.com)

## Gebruikte programma's
- [Visual Studio Code](https://code.visualstudio.com/)
- [MongoDB](https://www.mongodb.com/)
- Google
