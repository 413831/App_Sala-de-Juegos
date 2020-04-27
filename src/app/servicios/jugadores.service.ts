import { Injectable } from '@angular/core';
import { ArchivosJugadoresService } from './archivos-jugadores.service';

import { HttpClient } from  '@angular/common/http';
import { Jugador } from '../clases/jugador';

@Injectable()
export class JugadoresService {
  jugadores: Jugador[];
  private url;
  peticion: any;
  filtrado: any;

  constructor(private http: HttpClient) {
    localStorage.setItem("jugadores",JSON.stringify(this.jugadores));
    //public miHttp: ArchivosJugadoresService
    //this.peticion = this.miHttp.traerJugadores();
    //    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  traerLocal() : Jugador[]
  {
    return this.jugadores = JSON.parse(localStorage.getItem("productos"));
  }

  guardarLocal(jugador: Jugador)
  {
    this.jugadores = [];
    this.jugadores = this.traerLocal();
    this.jugadores.push(jugador);
    localStorage.setItem("jugadores",JSON.stringify(this.jugadores));
  }


  traertodos() {
    return this.http.get(this.url);
  }

  // traertodos(ruta: string, filtro: string) {
  //   return this.miHttp.traerJugadores(ruta).then(data => {
  //     console.info("jugadores service", data);

  //     this.filtrado = data;

  //     let ganador: boolean;
  //     if (filtro == "ganadores") {
  //       ganador = true;
  //     }
  //     else {
  //       ganador = false;
  //     }

  //     this.filtrado = this.filtrado.filter(
  //       data => data.gano === ganador || filtro == "todos"); return this.filtrado
  //      }
  //   )
  //     .catch(error => {
  //       console.log("error")
  //       return this.filtrado;
  //     });
  // }

}
