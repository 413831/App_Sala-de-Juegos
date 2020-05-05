import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { MiHttpService } from './mi-http/mi-http.service';

import { environment } from '../../environments/environment';
import { JuegoAnagrama } from '../clases/juego-anagrama';
import { JuegoAgilidad } from '../clases/juego-agilidad';
import { JuegoPiedraPapelTijera } from '../clases/juego-piedra-papel-tijera';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable()
export class JuegoServiceService {
  juegos: Juego[] = [];
  private database;
  private url = environment.database;
  private json = environment.juegos;
  peticion:any;
  
  constructor( private http: HttpClient ) {
    //this.peticion = this.http.httpGetO("http://localhost:3003");
    // this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
    console.log("Juegos service");
    this.database = firebase.database();
  }

  public crear(juego: Juego)
  {
      this.database.ref('juegos').push(juego).then(() => {
        console.info("Alta exitosa");
      }).catch(() => console.info("No se pudo realizar alta"));
  }

  public traerLocal(): Juego[] {
    console.info("GET localstorage");
    this.juegos = JSON.parse(localStorage.getItem("juegos"));
    return this.juegos; 
  }

  public fetchAll() : Juego[]
  {
    this.juegos = [];
    console.info("Fetch de todos los juegos");

    this.database.ref('juegos').once('value').then((snapshot) => 
    {
        this.juegos = [];
        snapshot.forEach((child) =>
        {
          // var data = child.val();
          this.juegos.push(child.val());
        });      
        localStorage.setItem('juegos', JSON.stringify(this.juegos));
    })
    .catch((e) => console.info('Error. No se realizo el fetch: ' + e));
    
    return this.juegos;
  }
  
  public listar(){

  }

  public listarPromesa(){
  
  }

}
