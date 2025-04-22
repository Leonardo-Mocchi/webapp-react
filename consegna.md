# Esercizio

## PART 1

Ora è il momento di prepararci al frontend della nostra Web App!

### MILESTONE 1

[x] Mettiamo su un nuovo progetto React aiutandoci con Vite
[x] Ripuliamo come sempre l’app da file e codice di esempio non necessari
[x] Installiamo il necessario: React Router, Axios e Bootstrap (se volete utilizzarlo)

### MILESTONE 2

[X] Creiamo un layout di base per la nostra applicazione ed impostiamo le rotte per le diverse pagine.
Creiamo 2 pagine:
[X] La home, in cui mostreremo la lista dei film
[X] La pagina di dettaglio di un singolo film

### MILESTONE 3

[X] Configuriamo l’app di backend (repo webapp-express) a ricevere chiamate dalla nostra applicazione React, installando e impostando il middleware CORS
[X] Proviamo quindi ad effettuare una chiamata Ajax dalla home del progetto React, per ottenere la lista dei libri

### MILESTONE 4

[x] In ultimo, effettuiamo una chiamata AJAX dalla pagina di dettaglio per ottenere il dettaglio di un singolo film, comprese le sue recensioni

### BONUS 1

[] Impostare la struttura del lavoro in maniera da sfruttare la riutailizzabilità dei componenti React e le loro props!
[X] Curare l’aspetto estetico della vostra applicazione

_______________________________________________________

## PART 2

Miglioriamo l’esperienza dell’utente inserendo

### MILESTONE 1 (BACKEND)

[] Predisponiamo un’API per salvare nel database una nuova recensione legata ad un film
[] Testiamola su postman e verifichiamo che nel DB venga effettivamente inserita una nuova recensioneù

### MILESTONE 2 (FRONTEND)

[] Creiamo un componente che contenga il form per le recensioni
[] Inseriamo questo componente nella pagina di dettaglio del film
[] All’invio del form, la nuova recensione viene salvata sul database e visualizzata nella pagina, in fondo alle altre

### BONUS 2

[] Inseriamo una validazione nel form di recensione

_______________________________________________________

## PART 3

[] Concludiamo migliorando l’esperienza sulla nostra SPA, inserendo un loader.
[] creiamo un componente loader
[] Questo componente deve poter apparire su qualunque pagina della nostra app.
[] Creiamo e sfruttiamo un Context per dare la possibilità ad ogni componente di attivare o disattivare il loader sulla propria pagina

### BONUS 3

[] Personalizziamo l’aspetto della nostra app col CSS
