
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})

export class AdivinaElNumeroComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  jugador: Jugador;
  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  vida: number;

  constructor(private miJugadoresServicio: JugadoresService, 
              private juegosService: JuegoServiceService) {
  }

  ngOnInit() {
    this.jugador = this.miJugadoresServicio.traerActual();
    this.nuevoJuego = new JuegoAdivina();
    this.nuevoJuego.jugador = this.jugador.nombre;
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
  }

  generarnumero() {
    this.jugador.jugados += 1;
    this.nuevoJuego.generarnumero();
    this.contador = 0;
    this.vida = 100;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;
    if (this.nuevoJuego.verificar()) 
    {
      this.MostarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;
      this.jugador.ganados += 1;
      this.enviarJuego.emit(this.nuevoJuego);
      this.juegosService.crear(this.nuevoJuego);
    }
    else if(this.contador === 10)
    {
      this.vida = 0;
      this.MostarMensaje("Perdiste campeón...");
      this.nuevoJuego.numeroSecreto = 0;

      this.jugador.perdidos += 1;
      this.nuevoJuego.gano = false;
      this.enviarJuego.emit(this.nuevoJuego);
      this.juegosService.crear(this.nuevoJuego);
    }
    else 
    {
      let mensaje: string = this.disminuirVida(this.contador);
      
      this.MostarMensaje("#" + this.contador + " " + mensaje + " ayuda :" + this.nuevoJuego.retornarAyuda());
    }
    console.info("numero Secreto:", this.nuevoJuego.gano);
    this.miJugadoresServicio.actualizarActual(this.jugador);
  }

  disminuirVida(contador: number){
    let mensaje;

    switch (contador) {
      case 1:
        mensaje = "No, intento fallido, animo";
        this.vida = 90;
        break;
      case 2:
        mensaje = "No,Te estaras Acercando???";
        this.vida = 80;
        break;
      case 3:
        mensaje = "No es, Yo crei que la tercera era la vencida.";
        this.vida = 70;
        break;
      case 4:
        mensaje = "No era el  " + this.nuevoJuego.numeroIngresado;
        this.vida = 55;
        break;
      case 5:
        mensaje = " intentos y nada.";
        this.vida = 45;
        break;
      case 6:
        mensaje = "Afortunado en el amor";
        this.vida = 25;
        break;
      default:
        mensaje = "Ya le erraste " + this.contador + " veces";
        this.vida = 10;
        break;
    }
    return mensaje;
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false)
  {
    this.Mensajes = mensaje;
    var x = document.getElementById("snackbar");
    var modelo = this;

    if (ganador) 
    {
      x.className = "show Ganador";
    } 
    else 
    {
      x.className = "show Perdedor";
    }
    
    setTimeout(function () {
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info("objeto", x);
  }

  
}
