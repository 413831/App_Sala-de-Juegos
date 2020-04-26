import { Juego } from '../clases/juego';

export class JuegoPiedraPapelTijera extends Juego {
    opcionIngresada: OpcionJuego;
    opcionRival: OpcionJuego;

    constructor(nombre?: string, gano?: boolean, jugador?:string) 
    {
        super("Piedra, papel o tijera",gano,jugador);        
    }

    public verificar(): boolean {
        if (this.opcionIngresada == this.opcionRival) 
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
        this.opcionRival = Math.floor(Math.random() * (3 - 1)) + 1;
        console.info('Resultado:' + this.opcionRival);
        this.gano = false;
    }

}

enum OpcionJuego{
    piedra,
    papel,
    tijera
}