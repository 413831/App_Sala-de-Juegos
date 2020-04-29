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
    localStorage.setItem("jugadores",JSON.stringify(this.jugadores));
    //this.peticion = this.miHttp.traerJugadores();
    //    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  public traerLocal() : Jugador[]
  {
    console.info("GET localstorage");
    return this.jugadores = JSON.parse(localStorage.getItem("jugadores"));
  }

  public guardarLocal(jugador: Jugador)
  {
    this.jugadores = new Array<Jugador>();
    this.jugadores = this.traerLocal();
    this.jugadores.push(jugador);
    localStorage.setItem("jugadores",JSON.stringify(this.jugadores));
    
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
