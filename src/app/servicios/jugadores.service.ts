import { Injectable } from '@angular/core';
import { ArchivosJugadoresService } from './archivos-jugadores.service';

import { HttpClient } from  '@angular/common/http';
import { Jugador } from '../clases/jugador';

@Injectable()
export class JugadoresService {
  jugadores: Jugador[] = [];
  private url;
  peticion: any;
  filtrado: any;

  constructor(private miHttp: ArchivosJugadoresService) {
    //this.peticion = this.miHttp.traerJugadores();
    //    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  public traerLocal() : Jugador[]
  {
    console.info("GET localstorage");
    return this.jugadores = JSON.parse(localStorage.getItem("archivoJugadores"));
  }

  public guardarLocal(jugador: Jugador)
  {
    this.jugadores = new Array<Jugador>();
    this.jugadores = this.traerLocal();
    this.jugadores.push(jugador);
    localStorage.setItem("archivoJugadores",JSON.stringify(this.jugadores)); 
  }

  public iniciarSesion(jugador: Jugador)
  {
    localStorage.setItem("jugadorActual",JSON.stringify(jugador));    
  }

  public cerrarSesion(jugador: Jugador)
  {
    localStorage.removeItem("jugadorActual");    
  }

  public traerActual()
  {
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

  public actualizarActual(jugador: Jugador)
  {
    let jugadores: Jugador[] = new Array<Jugador>();
    jugadores = this.traerLocal().filter( data => data.email != jugador.email);
    jugadores.push(jugador);
    localStorage.setItem("archivoJugadores",JSON.stringify(jugadores));
    localStorage.setItem("jugadorActual",JSON.stringify(jugador));
  }

  public traertodos(ruta: string, filtro: string) {
    return this.miHttp.traerJugadores(ruta).then(data => {
      console.info("jugadores service", data);

      this.filtrado = data;

      let ganador: boolean;
      if (filtro == "ganadores") {
        ganador = true;
      }
      else {
        ganador = false;
      }

      this.filtrado = this.filtrado.filter(
        data => data.gano === ganador || filtro == "todos"); return this.filtrado
       }
    )
      .catch(error => {
        console.log("error")
        return this.filtrado;
      });
  }

}
