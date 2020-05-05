import { Juego } from "./juego";

export class MataVirus extends Juego{
    public posicion: number;
    public botonPresionado: number;
    public puntos: number = 0;
    public puntosObjetivo: number;
    public finTurno: boolean;
    public nivel: number = 0;
    public velocidad: number = 0;

    constructor(nombre?: string, gano?: boolean, jugador?:string) 
    {
        super("Matar al virus",gano,jugador);        
    }

    public verificar(): boolean {
        if(this.puntos >= this.puntosObjetivo && !this.finTurno){
            return this.gano = true;
        }        
        return this.gano = false;        
    }

    public ataque(botonPresionado: number)
    {
        console.info("Presionado" + botonPresionado);
        if(botonPresionado == this.posicion){
            
            this.puntos += 100;
        }
    }

    public cambiarPosicion() 
    {
        this.posicion = Math.floor(Math.random() * (6 - 1)) + 1;
        console.info('Posicion:' + this.posicion);
    }

    public reiniciar()
    {
        this.nivel = 0;
        this.puntos = 0;
    }

    public subirNivel(){  
        this.finTurno = false;
        this.gano = false;      
        this.nivel += 1;
        this.puntosObjetivo = 500 * this.nivel;
        this.mayorPuntaje += this.puntos;
        this.puntos = 0;
        this.velocidad += 25;
    }

}