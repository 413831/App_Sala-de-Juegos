import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { ArchivosJugadoresService } from '../../servicios/archivos-jugadores.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {
  jugadores: Jugador[] = [];

  constructor(private miJugadoresServicio: JugadoresService) {
  }

  ngOnInit() {
  }

  TraerTodos() {
    console.info("Traer todos");
    // this.miJugadoresServicio.getJugadores('jugadores.json')
    //                         .subscribe((response: Jugador[]) => {
    //   console.info("jugadores service", response);
    //     this.jugadores = response;     
      
    //   }, error => console.log("error" + error));
    
    // console.info("Array"+this.jugadores);
    this.jugadores=this.miJugadoresServicio.traerLocal();
  }
  TraerGanadores() {
    console.info("Traer ganadores");
    // this.miJugadoresServicio.getJugadores('jugadores.json')
    //                         .subscribe((response: Jugador[]) => {
    //   console.info("jugadores service", response);
    //    this.jugadores = response.filter( jugador => jugador.ganados > jugador.perdidos);                 
    //   }, error => console.log("error" + error));
    this.jugadores=this.miJugadoresServicio.traerLocal().filter(jugador => jugador.ganados > jugador.perdidos);
  }
  TraerPerdedores() {
    console.info("Traer perdedores");
    // this.miJugadoresServicio.getJugadores('jugadores.json')
    //                         .subscribe((response: Jugador[]) => {
    //   console.info("jugadores service", response);
    //    this.jugadores = response.filter( jugador => jugador.ganados < jugador.perdidos);                   
    //   }, error => console.log("error" + error));
    this.jugadores=this.miJugadoresServicio.traerLocal().filter(jugador => jugador.ganados < jugador.perdidos);;
  }
}
