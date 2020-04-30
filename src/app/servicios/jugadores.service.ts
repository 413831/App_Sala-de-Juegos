import { Injectable } from '@angular/core';
import { ArchivosJugadoresService } from './archivos-jugadores.service';

import { HttpClient } from '@angular/common/http';
import { Jugador } from '../clases/jugador';
import { environment } from '../../environments/environment';

@Injectable()
export class JugadoresService {
  jugadores: Jugador[] = [];
  private url = environment.database;
  private json = environment.jugadores;
  peticion: any;
  filtrado: any;

  constructor(private http: HttpClient) {
    //this.peticion = this.miHttp.traerJugadores();
    //    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  public traerLocal(): Jugador[] {
    console.info("GET localstorage");
    this.jugadores = JSON.parse(localStorage.getItem("archivoJugadores"));
    return this.jugadores; 
  }

  public guardar(jugador: Jugador) {
    this.jugadores = new Array<Jugador>();
    this.jugadores = this.traerLocal();
    this.jugadores.push(jugador);
    localStorage.setItem("archivoJugadores", JSON.stringify(this.jugadores));
    this.postJugador(jugador);
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

    jugador.nombre = data.nombre;
    jugador.email = data.email;
    jugador.jugados = data.jugados;
    jugador.ganados = data.ganados;
    jugador.perdidos = data.perdidos;

    return jugador;
  }

  public actualizarActual(jugador: Jugador) {
    let jugadores: Jugador[] = new Array<Jugador>();
    jugadores = this.traerLocal().filter(data => data.email != jugador.email);
    jugadores.push(jugador);
    localStorage.setItem("archivoJugadores", JSON.stringify(jugadores));
    localStorage.setItem("jugadorActual", JSON.stringify(jugador));
  }

  public getJugadores()  {    

    return this.http.get(this.url + this.json).subscribe(response => {
      console.info("jugadores service", response);
       
      Object.keys(response).map(key => response[key]).forEach( element => {
          this.jugadores.push(Jugador.CrearJugador(element.nombre, element.email, element.clave,
                                                  element.pais, element.jugados, 
                                                  element.ganados, element.perdidos));
        });          
        localStorage.setItem("archivoJugadores",JSON.stringify(this.jugadores));

      console.info("Array de jugadores" + this.jugadores);
      }, error => console.log("error" + error));
  }

  // (res: any) => {
  //   this.data = Object.keys(res).map((key) => { return res[key] });
  //     this.data.forEach(element => {
  //       this.jugador = new Jugador(element.correo, element.clave);
  //       this.jugadores.push(this.jugador);
  //     });
  //   });

  public postJugador(jugador: Jugador)
  {
    return this.http.post(this.url + this.json, jugador).subscribe( data => { 
      console.log( data );
      return data;
    });
  }
}
