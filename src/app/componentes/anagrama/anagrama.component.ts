import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  @Output()
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  jugador: Jugador;
  nuevoJuego : JuegoAnagrama;
  contador: number;
  ocultarVerificar: boolean;
  vida: number;

  constructor(private miJugadoresServicio: JugadoresService, 
    private juegosService: JuegoServiceService) { }

  ngOnInit() {
    this.jugador = this.miJugadoresServicio.traerActual();
    this.nuevoJuego = new JuegoAnagrama();
    this.nuevoJuego.jugador = this.jugador.nombre;
    this.ocultarVerificar = false;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;

    if (this.nuevoJuego.verificar()) 
    {
      this.jugador.ganados += 1;
      this.enviarJuego.emit(this.nuevoJuego);
      this.juegosService.guardar(this.nuevoJuego);
    }
    else if(this.contador === 10)
    {
      this.vida = 0;

      this.jugador.perdidos += 1;
      this.nuevoJuego.gano = false;
      this.enviarJuego.emit(this.nuevoJuego);
      this.juegosService.guardar(this.nuevoJuego);
    }
    else 
    {
      let mensaje: string;
      
      this.disminuirVida(this.contador);
     
    }
    console.info("Anagrama :", this.nuevoJuego.gano);
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
        mensaje = "Casi casi, pero no";
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
}
