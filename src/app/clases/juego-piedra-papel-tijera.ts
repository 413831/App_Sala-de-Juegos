import { Juego } from '../clases/juego';

export class JuegoPiedraPapelTijera extends Juego {
    opcionIngresada: number;
    opcionRival: number;

    constructor(nombre?: string, gano?: boolean, jugador?:string) 
    {
        super("Piedra, papel o tijera",gano,jugador);        
    }

    public verificar(): boolean {
        if (this.opcionIngresada === 1 && this.opcionRival === 3) 
        {   // Piedra
            this.gano = true;
        }
        else if(this.opcionIngresada === 2 && this.opcionRival === 1)
        {   // Papel
            this.gano = true;
        }
        else if(this.opcionIngresada === 3 && this.opcionRival === 2)
        {   // Tijera
            this.gano = true;
        }
        else if(this.opcionIngresada && this.opcionRival)
        {
            this.gano = false;
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
        console.info(this.opcionRival);
    }

}
