import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { JuegoTateti, Ficha, Ganador } from '../../clases/juego-tateti';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';

// import {
//   trigger,
//   state,
//   style,
//   animate,
//   transition,
//   // ...
// } from '@angular/animations';

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {
   
  @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoTateti;
  jugador: Jugador;
  finJuego: Boolean;
  inicio: Boolean;
  celdaVacia = '-';
  tablero = 
        [
            [Ficha.vacio,Ficha.vacio,Ficha.vacio],
            [Ficha.vacio,Ficha.vacio,Ficha.vacio],
            [Ficha.vacio,Ficha.vacio,Ficha.vacio]
        ];

  constructor(private servicioJugadores: JugadoresService, 
    private juegoService: JuegoServiceService) {
      console.log("Constructor tateti");
      this.inicio = true;
      // state('vacio', style());
     }

  ngOnInit(): void {
    this.jugador = this.servicioJugadores.traerActual();
    this.nuevoJuego = new JuegoTateti();
    this.nuevoJuego.jugador = this.jugador.nombre;
    this.nuevoJuego.ganador = Ganador.vacio;
    this.finJuego = true;
  }

  jugar(ficha: number){
    this.nuevoJuego.crearTablero();
    this.nuevoJuego.elegirFicha(ficha);
    this.nuevoJuego.turno = 0;
    this.finJuego = false;
  }

  reset(){
    this.tablero = 
        [
            [Ficha.vacio,Ficha.vacio,Ficha.vacio],
            [Ficha.vacio,Ficha.vacio,Ficha.vacio],
            [Ficha.vacio,Ficha.vacio,Ficha.vacio]
        ];
    this.nuevoJuego.ganador = 0;
    this.nuevoJuego.turno = 0;
  }

  ponerFicha(fila, columna){
    let posicionMaquina;
    console.log("Turno: " + this.nuevoJuego.turno);
    console.log("Fila: " + fila + " columna: " + columna);
    
    if(!this.finJuego)
    {
      if(this.nuevoJuego.fichaJugador == Ficha.circulo)
      {
        this.nuevoJuego.ponerFicha(Ficha.circulo, fila, columna);
        this.nuevoJuego.turno++;
        this.tablero[fila][columna] = this.nuevoJuego.fichaJugador;
        posicionMaquina = this.nuevoJuego.jugadaComputadora();
        this.nuevoJuego.turno++;
        this.tablero[posicionMaquina[0]][posicionMaquina[1]] = this.nuevoJuego.fichaMaquina;
       
      }
    }
    this.verificar();
  }

  verificar(){
    if(this.nuevoJuego.verificar() && this.nuevoJuego.ganador != 0 ){
      console.log("Verificar");
      this.enviarJuego.emit(this.nuevoJuego);
    }
  }
}
