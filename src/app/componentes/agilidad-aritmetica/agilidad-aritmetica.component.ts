import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription, VirtualTimeScheduler} from "rxjs";
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  //@Input() jugador: Jugador;
  @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  jugador: Jugador;
  mensaje: String; 
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  contador: number;
  jugo: Boolean;
  private subscription: Subscription;

  
  constructor(private miJugadoresServicio: JugadoresService, 
              private juegoService: JuegoServiceService) {
    this.ocultarVerificar=true;
    this.Tiempo = 20;
    this.nuevoJuego = new JuegoAgilidad();
    //this.nuevoJuego.jugador = this.jugador.nombre;
    console.info("Inicio agilidad");
  }

  ngOnInit() {
    this.jugador = this.miJugadoresServicio.traerActual();
  }


  NuevoJuego() {
    this.jugo = false;
    this.nuevoJuego = new JuegoAgilidad();
    this.nuevoJuego.nombre = this.jugador.nombre;
    this.nuevoJuego.generar();
    this.jugador.jugados += 1;
    this.ocultarVerificar=false;
    this.repetidor = setInterval(()=>{

      this.Tiempo--;
      console.log("llego", this.Tiempo);
        if(this.Tiempo==0) {
          this.verificar();          
          clearInterval(this.repetidor);
          this.Tiempo=20;
        }
      }, 900);
      
  }

  verificar()
  {
    console.log("verificar");
    this.jugo = true;
    console.log('Se jugo: '+ this.jugo);
    if (this.nuevoJuego.verificar()) 
    {
      this.enviarJuego.emit(this.nuevoJuego);
      this.mensaje = 'Buenardo!';
      this.ocultarVerificar=true;
      this.jugador.ganados += 1;
      this.nuevoJuego.gano = true;
      //this.MostarMensaje("Sos un Genio!!!", true);
    }
    else 
    {
      this.enviarJuego.emit(this.nuevoJuego);
      this.mensaje = 'Malardo...';
      this.ocultarVerificar=true;
      this.jugador.perdidos += 1;
      this.nuevoJuego.gano = false;
      //this.MostarMensaje("Perdiste campeón...");
    }
    
    console.info("Resultado:", this.nuevoJuego.resultado);
    this.miJugadoresServicio.actualizarActual(this.jugador);
    this.enviarJuego.emit(this.nuevoJuego);
    this.juegoService.guardar(this.nuevoJuego);
    clearInterval(this.repetidor);
  }

  // MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false)
  // {
  //   this.Mensajes = mensaje;
  //   var x = document.getElementById("snackbar");
  //   var modelo = this;

  //   if (ganador) 
  //   {
  //     x.className = "show Ganador";
  //   } 
  //   else 
  //   {
  //     x.className = "show Perdedor";
  //   }
    
  //   setTimeout(function () {
  //     x.className = x.className.replace("show", "");
  //     modelo.ocultarVerificar = false;
  //   }, 3000);
  //   console.info("objeto", x);
  // }

}
