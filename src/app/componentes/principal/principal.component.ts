import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../clases/jugador';
import { Juego } from '../../clases/juego';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor() {
    // Set local storage 
    if(!localStorage.getItem("archivoJugadores"))
    {
      let jugadores: Jugador[] = [];
      localStorage.setItem("archivoJugadores",JSON.stringify(jugadores));
    }

    if(!localStorage.getItem("juegos"))
    {
      let juegos: Juego[] = []; 
      localStorage.setItem("juegos",JSON.stringify(juegos));
    }

    if(!localStorage.getItem("jugadorActual"))
    {
      let jugador: Jugador = new Jugador(); 
      localStorage.setItem("jugadorActual",JSON.stringify(jugador));
    }
  }

  ngOnInit() {
  }

 

}
