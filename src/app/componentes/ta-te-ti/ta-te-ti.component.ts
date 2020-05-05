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
    this.inicio = true;
  }

  jugar(ficha: number){
    this.inicio = false;
    this.nuevoJuego.crearTablero();
    this.nuevoJuego.elegirFicha(ficha);
    this.nuevoJuego.turno = 0;
    this.finJuego = false;
  }

  reset(){
    let ficha = this.nuevoJuego.fichaJugador;
    let maquina = this.nuevoJuego.fichaMaquina;
    console.log("Ficha: "+  ficha);
    this.nuevoJuego = new JuegoTateti();
    this.nuevoJuego.jugador = this.jugador.nombre;
    this.nuevoJuego.fichaJugador = ficha;
    this.nuevoJuego.fichaMaquina = maquina;
    this.nuevoJuego.ganador = Ganador.vacio;
    this.nuevoJuego.turno = 0;
    this.finJuego = false;
    this.tablero = 
        [
            [Ficha.vacio,Ficha.vacio,Ficha.vacio],
            [Ficha.vacio,Ficha.vacio,Ficha.vacio],
            [Ficha.vacio,Ficha.vacio,Ficha.vacio]
        ];
  }

  ponerFicha(fila, columna){
    let posicionMaquina = [];
    console.log("Turno: " + this.nuevoJuego.turno);
    console.log("Fila: " + fila + " columna: " + columna);
    
    if(!this.finJuego || this.nuevoJuego.turno <= 9)
    {
      this.nuevoJuego.ponerFicha(Ficha.circulo, fila, columna);
      this.nuevoJuego.turno++;
      this.tablero[fila][columna] = this.nuevoJuego.fichaJugador;
      this.verificar();
      posicionMaquina = this.nuevoJuego.jugadaComputadora();
      this.nuevoJuego.turno++;
      this.tablero[posicionMaquina[0]][posicionMaquina[1]] = this.nuevoJuego.fichaMaquina;
      this.verificar();
    }
  }
  
  verificar(){
    console.log("Verificar jugada");

    if(this.nuevoJuego.verificar())
    {
      if(this.nuevoJuego.ganador === 1){
        this.jugador.ganados++;
        this.finJuego = true;
      }
      else{
        this.jugador.perdidos++;
        this.finJuego = true;
      }
      this.enviarJuego.emit(this.nuevoJuego);
      this.actualizarDatos();
    }
    else if(this.nuevoJuego.turno == 9 && this.nuevoJuego.ganador == 0 )
    {
      this.jugador.empatados++;
      this.finJuego = true;
      this.enviarJuego.emit(this.nuevoJuego);
      this.actualizarDatos();
    }
  }

  actualizarDatos(){
    this.juegoService.crear(this.nuevoJuego);
    this.servicioJugadores.actualizarActual(this.jugador);
  }
}
