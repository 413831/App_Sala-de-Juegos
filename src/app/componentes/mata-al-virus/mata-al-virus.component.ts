import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { MataVirus } from '../../clases/juego-virus';
import { Jugador } from '../../clases/jugador';
import { timeoutWith } from 'rxjs/operators';

@Component({
  selector: 'app-mata-al-virus',
  templateUrl: './mata-al-virus.component.html',
  styleUrls: ['./mata-al-virus.component.css']
})
export class MataAlVirusComponent implements OnInit {
  @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : MataVirus;
  jugador: Jugador;
  tiempo: number;
  tiempoTotal:any;
  enJuego: Boolean;

  constructor(private miJugadoresServicio: JugadoresService, 
    private juegoService: JuegoServiceService) { }

  ngOnInit(): void {
    this.jugador = this.miJugadoresServicio.traerActual();
    this.nuevoJuego = new MataVirus();
    this.nuevoJuego.jugador = this.jugador.nombre;
  }

  jugar(){
    this.enJuego = true;
    this.nuevoJuego.subirNivel();
    this.jugador.jugados += 1;
    this.tiempo = 20;
    this.iniciar();
    this.guardarDatos();
  }

  reiniciar()
  {
    this.nuevoJuego.nivel = 0;
    this.nuevoJuego.puntos = 0;  
  }

  iniciar(){
    this.tiempoTotal = setInterval(()=>{
      this.nuevoJuego.cambiarPosicion();
      if(this.nuevoJuego.gano){
        this.nuevoJuego.finTurno = true; 
        this.nuevoJuego.posicion = 0;
        clearInterval(this.tiempoTotal);
      }

      this.tiempo--;
      console.log("Tiempo: ", this.tiempo);
        if(this.tiempo==0) {
          this.nuevoJuego.finTurno = true;  
          this.jugador.perdidos += 1;    
          clearInterval(this.tiempoTotal);
          this.tiempo=20;
        }
      }, 900 - this.nuevoJuego.velocidad);  
  }

  atacar(posicion: number){
    this.nuevoJuego.botonPresionado = posicion;
    this.nuevoJuego.ataque();
    this.verificar();
  }

  verificar()
  {
    if(this.nuevoJuego.verificar())
    {
      this.jugador.ganados += 1;
      this.nuevoJuego.gano = true;
      return true;
    }
    return false;
  }

  guardarDatos(){
    this.miJugadoresServicio.guardar(this.jugador);
    this.enviarJuego.emit(this.nuevoJuego);
  }
}
