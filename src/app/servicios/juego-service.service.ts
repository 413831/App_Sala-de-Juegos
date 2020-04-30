import { Injectable } from '@angular/core';
import { Juego } from '../clases/juego';
import { JuegoAdivina } from '../clases/juego-adivina';
import { MiHttpService } from './mi-http/mi-http.service';

import { environment } from '../../environments/environment';
import { JuegoAnagrama } from '../clases/juego-anagrama';
import { JuegoAgilidad } from '../clases/juego-agilidad';
import { JuegoPiedraPapelTijera } from '../clases/juego-piedra-papel-tijera';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JuegoServiceService {
  juegos: Juego[] = [];
  private url = environment.database;
  private json = environment.juegos;
  peticion:any;
  
  constructor( private http: HttpClient ) {
    //this.peticion = this.http.httpGetO("http://localhost:3003");
    // this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }

  public traerLocal(): Juego[] {
    console.info("GET localstorage");
    this.juegos = JSON.parse(localStorage.getItem("info-juegos"));
    return this.juegos; 
  }

  public guardar(juego: Juego) {
    this.juegos = new Array<Juego>();
    this.juegos = this.traerLocal();
    this.juegos.push(juego);
    localStorage.setItem("info-juegos", JSON.stringify(this.juegos));
    this.postJuego(juego);
  }

  public getJuegos()  {    

    return this.http.get(this.url + this.json).subscribe(response => {
      console.info("juegos service", response);
       
      Object.keys(response).map(key => response[key]).forEach( element => {
          this.juegos.push(element);
        });          
        localStorage.setItem("info-juegos",JSON.stringify(this.juegos));

      console.info("Array de juegos" + this.juegos);
      }, error => console.log("error" + error));
  }

  public postJuego(juego: Juego)
  {
    return this.http.post(this.url + this.json, juego).subscribe( data => { 
      console.log( data );
      return data;
    });
  }

  public listar(){
  //  this.http.httpGetP("https://restcountries.eu/rest/v2/all")
  //   .then( data => {
  //     console.log( data );
  //   })
  //   .catch( err => {
  //     console.log( err );
  //   });

  //   this.peticion
  //   .subscribe( data => {
  //     console.log("En listar");
  //     console.log( data );
  //   }, err => {
  //     console.info("error: " ,err );
  //   });

  //   let miArray: Array<Juego> = new Array<Juego>();

  //   miArray.push(new JuegoAdivina("Juego 1", false));
  //   miArray.push(new JuegoAdivina("Pepe", true));
  //   miArray.push(new JuegoPiedraPapelTijera("Juego 3", false));
  //   miArray.push(new JuegoAdivina("Juego 4", false));
  //   miArray.push(new JuegoPiedraPapelTijera("Juego 5", false));
  //   miArray.push(new JuegoAdivina("Juego 6", false));
  //   return miArray;
  }

  public listarPromesa(){
    // this.peticion
    // .subscribe( data => {
    //   console.log("En listarPromesa");
    //   console.log( data );
    // }, err => {
    //   console.log( err );
    // })
    // let promesa: Promise<Array<Juego>> = new Promise((resolve, reject) => {
    //   let miArray: Array<Juego> = new Array<Juego>();
    //   miArray.push(new JuegoAdivina("JuegoPromesa 1", false,"promesa"));
    //   miArray.push(new JuegoAdivina("PepePromesa", true));
    //   miArray.push(new JuegoPiedraPapelTijera("JuegoPromesa 3", false));
    //   miArray.push(new JuegoAgilidad("JuegoPromesa 4", false));
    //   miArray.push(new JuegoAgilidad("JuegoPromesa 5", false));
    //   miArray.push(new JuegoAdivina("JuegoPromesa 6", false));
    //   resolve(miArray);
    // });

    // return promesa;
  }

}
