import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  public sesionIniciada: boolean;

  constructor(private servicioJugadores: JugadoresService) { }

  ngOnInit() {
    this.checkSesion();
  }

  checkSesion(){
    if(JSON.parse(localStorage.getItem('jugadorActual')).nombre)
    {
      this.sesionIniciada = true;
    }
    else{
      this.sesionIniciada = false;
    }
  }

  cerrarSesion()
  {
    this.servicioJugadores.cerrarSesion();
    this.sesionIniciada = false;
  }


}
