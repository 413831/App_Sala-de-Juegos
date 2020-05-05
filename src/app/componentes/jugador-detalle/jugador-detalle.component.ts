import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-jugador-detalle',
  templateUrl: './jugador-detalle.component.html',
  styleUrls: ['./jugador-detalle.component.css']
})
export class JugadorDetalleComponent implements OnInit {
  public jugador: Jugador;

  constructor(private servicioJugador: JugadoresService,private route: ActivatedRoute,
             private router: Router) { }

  ngOnInit(): void {
    this.jugador = this.servicioJugador.traerActual();
  }

  cerrarSesion(){
    this.servicioJugador.cerrarSesion();
    this.router.navigate(['/Principal']);
  }


}
