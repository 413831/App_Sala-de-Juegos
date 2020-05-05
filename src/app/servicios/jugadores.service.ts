import { Injectable } from '@angular/core';
import { ArchivosJugadoresService } from './archivos-jugadores.service';

import { HttpClient } from '@angular/common/http';
import { Jugador } from '../clases/jugador';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

@Injectable()
export class JugadoresService {
  
  jugadores: Jugador[] = [];
  private database;
  peticion: any;
  filtrado: any;

  constructor(private http: HttpClient) {
    //this.peticion = this.miHttp.traerJugadores();
    //    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
    firebase.initializeApp(environment.firebaseConfig);
    firebase.analytics();
    this.database = firebase.database();
  }

  test(){
     // Initialize Firebase
    // Create

    // single
    // this.database.ref('jugadores/' + 0).set({
    //     nombre: 'Pepito',
    //     email: 'correo@mail.com',
    //     clave: 'secreta',
    //     pais: 'Argentina',
    //     jugados: 0,
    //     ganados: 0,
    //     perdidos: 0,
    // }).then(() => {
    //   console.info("Request successful");
    // }).catch(() => console.info("Request failed"));
    // multiple
   

    // this.database.ref('jugadores').push({
    //     nombre: 'Pepito',
    //     email: 'man@mail.com',
    //     clave: 'sar1**',
    //     pais: 'Argentina',
    //     jugados: 0,
    //     ganados: 0,
    //     perdidos: 0,
    // }).then(() => {
    //   console.info("Request successful");
    // }).catch(() => console.info("Request failed"));


    // Remove
    //
    // this.database.ref('jugadores/' + 0).remove().then(() => {
    //     console.info("Delete successful");
    //   }).catch(() => {
    //     console.info("Delete failed");
    //   });
    // Update
    
    // this.database.ref('jugadores/' + 1).update({
    //   name: 'Pepito',
    //   age: 36,
    //   country: 'Argentina'
    //   }).then(() => {
    //     console.info("Request successful");
    //   }).catch(() => console.info("Request failed"));
    // Read
    this.database.ref('jugadores')
        .once('value')
        .then((snapshot) => {
            this.jugadores = [];
            snapshot.forEach((child) =>{
              var data = child.val();
              this.jugadores.push(Jugador.CrearJugador(child.key, data.nombre, data.email,
                                                      data.clave, data.pais, data.jugados,
                                                      data.ganados, data.perdidos, data.empatados));
                                                    }); 
            console.info("Jugadores: " + this.jugadores);
            console.info("JSON Jugadores: " + JSON.stringify(this.jugadores));
            //  console.info("Array de jugadores:" + this.jugadores );
            })
        .catch((e) => console.info('Error fetching data ' + e));
        
    // Reading with subscriptions
    // this.database.ref().on('value',(snapshot) => {  
    //   let value = snapshot.val(); 
    //   let jugadores = value;
    //   console.info('JSON jugadores: '+JSON.stringify(value));
    //   console.info('Respuesta Firebase DB: '+value[0]);
    //   console.info('Array jugadores: '+ jugadores);
    // })
  }

  public crear(jugador: Jugador)
  {
      this.database.ref('jugadores').push(jugador).then(() => {
        console.info("Alta exitosa");
      }).catch(() => console.info("No se pudo realizar alta"));
  }

  public update(jugador: Jugador)
  {
    this.database.ref('jugadores/' + jugador.id).update(jugador).then(() => {
          console.info("Actualizacion exitosa");
        }).catch(() => console.info("No se pudo actualizar"));
  }

  public traerLocal(): Jugador[] {
    console.info("GET localstorage");
    this.jugadores = JSON.parse(localStorage.getItem("jugadores"));
    return this.jugadores; 
  }

  public fetchAll() : Jugador[]
  {
    this.jugadores = [];
    console.info("Fetch de todos los jugadores");

    this.database.ref('jugadores').once('value').then((snapshot) => 
    {
        this.jugadores = [];
        snapshot.forEach((child) =>
        {
          var data = child.val();
          this.jugadores.push(Jugador.CrearJugador(child.key, data.nombre, data.email,
                                                  data.clave, data.pais, data.jugados,
                                                  data.ganados, data.perdidos, data.empatados));
        });        
        localStorage.setItem('jugadores', JSON.stringify(this.jugadores));
    })
    .catch((e) => console.info('Error. No se realizo el fetch: ' + e));
    
    return this.jugadores;
  }

  public delete(id: string)
  {

  }

  public iniciarSesion(jugador: Jugador) {
    localStorage.setItem("jugadorActual", JSON.stringify(jugador));
  }

  public cerrarSesion() {
    localStorage.removeItem("jugadorActual");
  }

  public traerActual() {
    let jugador: Jugador = new Jugador();
    let data;
    data = JSON.parse(localStorage.getItem("jugadorActual"));

    jugador = Jugador.CrearJugador(data.id, data.nombre, data.email, data.clave, 
                                  data.pais, data.jugados,data.ganados, data.perdidos, data.empatados);
    return jugador;
  }

  public actualizarActual(jugador: Jugador) {    
    this.update(jugador);
    localStorage.setItem("jugadorActual", JSON.stringify(jugador));
  }
}
