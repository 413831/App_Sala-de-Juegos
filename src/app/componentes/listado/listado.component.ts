import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;

  constructor(private juegoService:JuegoServiceService) {
    
  }
  
  ngOnInit() {
    
  }

  traerTodos() {
    this.listadoParaCompartir = this.juegoService.traerLocal(); 
  }

  traerGanados(){
    this.listadoParaCompartir = this.juegoService.traerLocal().filter((juego) => juego.gano);
  }

  traerPerdidos()
  {
    this.listadoParaCompartir = this.juegoService.traerLocal().filter((juego) => !juego.gano);
  }

}
