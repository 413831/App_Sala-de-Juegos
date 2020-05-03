// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  database: 'https://tp-sala-de-juegos-labiv.firebaseio.com/',
  firebaseConfig : {
    'apiKey': "AIzaSyAL0l15LhwY598e4huhGyXT9pSBJWGSJhg",
    'authDomain': "tp-sala-de-juegos-labiv.firebaseapp.com",
    'databaseURL': "https://tp-sala-de-juegos-labiv.firebaseio.com",
    'projectId': "tp-sala-de-juegos-labiv",
    'storageBucket': "tp-sala-de-juegos-labiv.appspot.com",
    'messagingSenderId': "516009342996",
    'appId': "1:516009342996:web:9a301726d4b3b4e85acf01",
    'measurementId': "G-FYKRNX9886"
  },
  jugadores: 'jugadores.json',
  juegos: 'archivoJuegos.json',
  palabras: ['tomate','zanahoria','vehiculo','persona','episcopal','vasija','palindromo',
          'elefante']
};
