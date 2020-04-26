import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  @Input() jugador: Jugador;
  nuevoJuego: JuegoPiedraPapelTijera;
  mensaje: String; 

  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.nuevoJuego.jugador = this.jugador.nombre;
    console.info("Inicio piedra, papel o tijera");
  }

  ngOnInit(): void {
  }

}
