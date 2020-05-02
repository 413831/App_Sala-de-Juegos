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
  private http: HttpClient;

  constructor() { }

  ngOnInit() {
    this.checkSesion();
  }

  checkSesion(){
    if(localStorage.getItem('jugadorActual'))
    {
      this.sesionIniciada = true;
    }
    else{
      this.sesionIniciada = false;
    }
  }

  cerrarSesion()
  {
    let servicio: JugadoresService = new JugadoresService(this.http);

    servicio.cerrarSesion();
    this.sesionIniciada = false;
  }


}
