import { Juego } from "./juego";
import { environment } from "../../environments/environment";
 
export class JuegoAnagrama extends Juego {
    palabraIngresada: string = '';
    palabraGenerada: string = '';
    anagrama: string = '';
    setPalabras: string[] = environment.palabras;
  
    constructor(nombre?: string, gano?: boolean, jugador?:string) 
    {
        super("Agilidad con aritmetica",gano,jugador);        
        this.generar();
    }
  
    public verificar(): boolean {
      if (this.palabraIngresada == this.palabraGenerada) 
      {
        this.gano = true;
      }
  
      if (this.gano) 
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  
    public generar() 
    {
        this.palabraGenerada = this.setPalabras[Math.floor(Math.random() * (this.setPalabras.length - 1)) + 1];
        this.anagrama = this.palabraGenerada.split('').reverse().sort().toString();  
        
        console.info('Resultado:' + this.palabraGenerada);
        this.gano = false;
    }
}
