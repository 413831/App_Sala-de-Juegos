import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  public jugadorLogueado: Boolean;

  constructor(private servicioJugadores: JugadoresService, private router: Router) { }

  ngOnInit() {
    this.validarJugador();
    if(!this.jugadorLogueado){
      this.router.navigate(['/Login']);
    }
  }

  validarJugador()
  {    
    if(this.servicioJugadores.traerActual())
    {
      this.jugadorLogueado = true;
    }
    else
    {
      this.jugadorLogueado = false;
    }
  }

}
