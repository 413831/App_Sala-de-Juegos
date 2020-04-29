import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { ArchivosJugadoresService } from '../../servicios/archivos-jugadores.service';

@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {
  jugadores: any
  miJugadoresServicio: JugadoresService

  constructor(serviceJugadores: JugadoresService) {
    this.miJugadoresServicio = serviceJugadores;
  }

  ngOnInit() {
  }

  TraerTodos() {
    // console.info("Traer todos");
    // this.miJugadoresServicio.traertodos('jugadores/','todos').then(data=>{
    //   console.info("jugadores listado",(data));
    //   this.jugadores= data;

    // })
    this.jugadores=this.miJugadoresServicio.traerLocal();
  }
  TraerGanadores() {
    // this.miJugadoresServicio.traertodos('jugadores/','ganadores').then(data=>{
    //   console.info("jugadores listado",(data));
    //   this.jugadores = data;

    // })
  }
  TraerPerdedores() {
    // this.miJugadoresServicio.traertodos('jugadores/','perdedores').then(data=>{
    //   console.info("jugadores listado",(data));
    //   this.jugadores = data;

    // })
  }

}
