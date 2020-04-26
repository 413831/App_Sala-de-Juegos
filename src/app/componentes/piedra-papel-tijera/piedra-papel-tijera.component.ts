import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuevo: JuegoPiedraPapelTijera;
  mensaje: String; 


  constructor() {
    this.nuevoJuevo = new JuegoPiedraPapelTijera();
    console.info("Inicio piedra, papel o tijera");
  }

  ngOnInit(): void {
  }

}
