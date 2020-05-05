import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';

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
  jugador: Jugador; 
  empate: Boolean;

  constructor(private miJugadoresServicio: JugadoresService, 
            private juegoServicio: JuegoServiceService) {
    this.jugador = this.miJugadoresServicio.traerActual();
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.nuevoJuego.jugador = this.jugador.nombre;
    this.empate = false;
    //this.nuevoJuego.jugador = this.jugador.nombre;
    console.info("Inicio piedra, papel o tijera");
  }

  ngOnInit(): void {
    this.finJuego = false;
  }

  generar()
  {
    this.jugador.jugados += 1;
    this.nuevoJuego.generar();
  }

  verificar()
  {    
    if(this.nuevoJuego.verificar())
    {
      this.jugador.ganados++;
      this.nuevoJuego.gano = true;
    }
    else if(this.nuevoJuego.opcionIngresada === this.nuevoJuego.opcionRival)
    {
      this.jugador.empatados++;
      this.empate = true;
    }
    else 
    {
      this.jugador.perdidos++;
      this.nuevoJuego.gano = false;
    }
    this.miJugadoresServicio.actualizarActual(this.jugador); 
    this.juegoServicio.crear(this.nuevoJuego);
    this.finJuego = true;
  }

  eligePiedra()
  {
    this.nuevoJuego.generar();
    this.nuevoJuego.opcionIngresada = 1;
    this.verificar();
  }
  
  eligePapel()
  {
    this.nuevoJuego.generar();
    this.nuevoJuego.opcionIngresada = 2;
    this.verificar();
  }
  
  eligeTijera()
  {
    this.nuevoJuego.generar();
    this.nuevoJuego.opcionIngresada = 3;
    this.verificar();
  }

  reset(){
    this.empate = false;
    this.finJuego = false;
    this.generar();
  }
}
