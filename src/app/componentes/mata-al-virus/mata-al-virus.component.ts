import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { MataVirus } from '../../clases/juego-virus';
import { Jugador } from '../../clases/jugador';
import { timeoutWith } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

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
  url: any;

  constructor(private servicioJugadores: JugadoresService, 
    private juegoService: JuegoServiceService,
    private _sanitizer: DomSanitizer) {
      
    }

  ngOnInit(): void {
    this.setPremio("https://www.youtube.com/embed/i_cVJgIz_Cs");
    this.jugador = this.servicioJugadores.traerActual();
    this.nuevoJuego = new MataVirus();
    this.nuevoJuego.jugador = this.jugador.nombre;
  }

  jugar(){
    this.enJuego = true;
    this.nuevoJuego.subirNivel();
    this.tiempo = 20;
    this.iniciar();
    this.jugador.jugados += 1;
    this.actualizar();
  }

  reiniciar()
  {
    this.nuevoJuego.puntos = 0;  
    this.jugar();
  }

  iniciar(){
    this.tiempoTotal = setInterval(()=>{
      this.nuevoJuego.cambiarPosicion();
      if(this.nuevoJuego.gano){
        this.jugador.ganados++;
        this.nuevoJuego.finTurno = true; 
        this.nuevoJuego.posicion = 0;
        clearInterval(this.tiempoTotal);
      }

      this.tiempo--;
      console.log("Tiempo: ", this.tiempo);
        if(this.tiempo==0) {
          this.jugador.perdidos++; 
          this.nuevoJuego.finTurno = true;  
          this.nuevoJuego.posicion = 0;
          clearInterval(this.tiempoTotal);
          this.tiempo=20;
        }
      }, 900 - this.nuevoJuego.velocidad);  
  }

  atacar(botonPresionado: number){
    this.nuevoJuego.ataque(botonPresionado);
    this.verificar();
  }

  verificar()
  {
    if(this.nuevoJuego.verificar())
    {
      this.nuevoJuego.gano = true;
      return true;
    }
    return false;
  }

  actualizar(){
    this.servicioJugadores.actualizarActual(this.jugador);
    this.juegoService.crear(this.nuevoJuego);
    this.enviarJuego.emit(this.nuevoJuego);
  }

  setPremio(videoURL: string){

    this.url = this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }
}
