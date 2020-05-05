import { Jugador } from "./jugador";

export abstract class Juego {
  public id: string;
  public nombre = 'Sin Nombre';
  public jugador: string;
  public gano: boolean = false;
  public mejorPuntaje : Jugador;
  public mayorPuntaje : number = 0;

  constructor(nombre?: string, gano?: boolean,jugador?:string) {
    if (nombre)
    {
      this.nombre = nombre;
    }

    if (gano)
    {
      this.gano = gano;
    }
    if(jugador)
    {
      this.jugador=jugador;
    }
    else
    {
      this.jugador= "anonimo";
    }
  }

  public abstract verificar():boolean; 
  
  public retornarAyuda() {  
    return "NO hay Ayuda definida";
  }
}
