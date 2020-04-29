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
 // @Input() jugador: Jugador;
  nuevoJuego: JuegoPiedraPapelTijera;
  mensaje: String; 
  finJuego: boolean;
  jugadorDummy: Jugador; 

  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.jugadorDummy = new Jugador()
    //this.nuevoJuego.jugador = this.jugador.nombre;
    console.info("Inicio piedra, papel o tijera");
  }

  ngOnInit(): void {
    this.finJuego = false;
  }

  verificar()
  {
    this.nuevoJuego.verificar();
    this.finJuego = true;
  }

  eligePiedra()
  {
    this.nuevoJuego.opcionIngresada = 1;
    this.verificar();
  }

  eligePapel()
  {
    this.nuevoJuego.opcionIngresada = 2;
    this.verificar();
  }

  eligeTijera()
  {
    this.nuevoJuego.opcionIngresada = 3;
    this.verificar();
  }


}
