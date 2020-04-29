import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { MiHttpService } from '../../servicios/mi-http/mi-http.service';
import { ArchivosJugadoresService } from '../../servicios/archivos-jugadores.service';

//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private http: ArchivosJugadoresService;
  jugador: Jugador;
  servicio: JugadoresService;
  existe: Boolean;
  checkTerminos: Boolean;
  patternMail: RegExp;
  patternClave: RegExp;
  patternInvalido: Boolean;
 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  constructor( private route: ActivatedRoute, private router: Router) { 
    this.servicio = new JugadoresService(this.http);
    console.info("Traer local"+ this.servicio);
    this.jugador = new Jugador();
    this.existe = false;
    this.patternMail = new RegExp('^[a-z0-9|*|_|-|$|&]+[@][a-z0-9]+[.][a-z]{2,3}','i');
    this.patternClave = new RegExp('^[a-z0-9]+[*|@|_|-|$|&]+', 'i');
    this.patternInvalido = false;
    this.checkTerminos = true;
  }

  ngOnInit() {
    window.onload = function() {
      const myInput = document.getElementById('clave-repeat').oncopy = (e) => e.preventDefault();
     }
  }

  existeJugador(jugador: Jugador) : boolean
  {
    if(this.servicio.traerLocal().find( datos => {
      return datos.email === this.jugador.email && datos.clave === this.jugador.clave;
      }))
    {
      return true;
    }
    return false;
  }

  validarOpciones()
  {
    let checkbox = <HTMLInputElement> document.getElementById('terminos-condiciones');

    if(checkbox.checked){
      this.checkTerminos = true;
      return true;
    }
    this.checkTerminos = false;
    return false;
  }

  validarDatos()
  {
    this.patternInvalido = false;

    if(this.existeJugador(this.jugador))
    {
      this.existe = true;
      console.info("Ya existe");
    }
    else if(this.patternMail.test(this.jugador.email) && this.patternClave.test(this.jugador.clave))
    {
      if(this.validarOpciones()){
        console.info("Alta de usuario");
        this.servicio.guardarLocal(this.jugador);
        this.existe = false;
        this.router.navigate(['/Principal']);
      }
    }
    else{
      this.patternInvalido = true;
      console.info("No paso la validacion");
    }
  }
}
