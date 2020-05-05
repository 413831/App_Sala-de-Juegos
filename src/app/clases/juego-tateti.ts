import { Juego } from './juego';

export class JuegoTateti extends Juego {
    public fichaJugador: Ficha;
    fichaMaquina: Ficha;
    tablero: Array<any>;
    turno: number;
    ganador: Ganador;

    constructor(nombre?: string, gano?: boolean, jugador?:string) 
    {
        super("Ta - te - ti",gano,jugador);   
        this.crearTablero();
        this.turno = 0;
    }

    public crearTablero(){
        this.tablero = 
        [
            [{ocupada: false, ficha: Ficha.vacio, posicion: [0,0]},{ocupada: false, ficha: Ficha.vacio, posicion: [0,1]},{ocupada: false, ficha: Ficha.vacio, posicion: [0,2]}],
            [{ocupada: false, ficha: Ficha.vacio, posicion: [1,0]},{ocupada: false, ficha: Ficha.vacio, posicion: [1,1]},{ocupada: false, ficha: Ficha.vacio, posicion: [1,2]}],
            [{ocupada: false, ficha: Ficha.vacio, posicion: [2,0]},{ocupada: false, ficha: Ficha.vacio, posicion: [2,1]},{ocupada: false, ficha: Ficha.vacio, posicion: [2,2]}]
        ]
        
        console.info("Tablero: "+ this.tablero);
    }

    public elegirFicha(ficha: number){
        if(ficha == 1)
        {
            this.fichaJugador = Ficha.circulo;
            this.fichaMaquina = Ficha.cruz;
        }
        else if(ficha == 2)
        {
            this.fichaJugador = Ficha.cruz;
            this.fichaMaquina = Ficha.circulo;
        }  
    }

    public ponerFicha(ficha: Ficha, fila: number, columna: number){
        this.tablero[fila][columna].ficha = ficha;
        this.tablero[fila][columna].ocupada = true;
    }  

    columna(n){
        let columna = [];
        for(let fila of this.tablero){
            columna.push(fila[n]);
        }
        return columna;
    }

    columnas()
    {   
        let columnas = [];
        columnas.push(this.columna(0));
        columnas.push(this.columna(1));
        columnas.push(this.columna(2));
        return columnas;
    }

    diagonales(){
        let diagonales = [];
        diagonales.push(this.tablero[0][0]);
        diagonales.push(this.tablero[1][1]);
        diagonales.push(this.tablero[2][2]);
        diagonales.push(this.tablero[0][2]);
        diagonales.push(this.tablero[1][1]);
        diagonales.push(this.tablero[2][0]);
        return diagonales;
    }
    
    reset(){
        this.turno = 0;
        this.tablero = 
        [
            [{ocupada: false, ficha: Ficha.vacio, posicion: [0,0]},{ocupada: false, ficha: Ficha.vacio, posicion: [0,1]},{ocupada: false, ficha: Ficha.vacio, posicion: [0,2]}],
            [{ocupada: false, ficha: Ficha.vacio, posicion: [1,0]},{ocupada: false, ficha: Ficha.vacio, posicion: [1,1]},{ocupada: false, ficha: Ficha.vacio, posicion: [1,2]}],
            [{ocupada: false, ficha: Ficha.vacio, posicion: [2,0]},{ocupada: false, ficha: Ficha.vacio, posicion: [2,1]},{ocupada: false, ficha: Ficha.vacio, posicion: [2,2]}]
        ]
        this.ganador = Ganador.vacio;
        console.info("Nuevo tablero: "+ this.tablero);
    }

    public tresEnLinea(ficha: Ficha){
        // Busco todas las combinaciones para ganar
        let lineas = this.columnas().concat(this.tablero).concat(this.diagonales()); 
        for (let linea of lineas){
            if(this.celdasIguales(linea, ficha)){
                return true;
            }
        }
        return false;
    }

    public celdasIguales(linea, ficha: Ficha){
        let contador = 0;
        
        for (let celda of linea)
        {
            if(celda.ocupada){
                if(ficha == celda.ficha)
                {
                    // primer celda                    
                    contador++;
                }
                else{
                    // no tiene fichas iguales
                    return false;
                }
            }
            else{
                return false; // Celda vacias
            }
        }
        return contador === 3;
    }

    public celdaDesocupada(){
        this.tablero.map((fila)=> {
            this.tablero[fila].map(columna => {
                if(!this.tablero[fila][columna].ocupada)
                {
                    return this.tablero[fila][columna].posicion;
                }
            });
        })
    }

    public celdasParaCompletarLinea(ficha){
        let lineas = this.columnas().concat(this.tablero).concat(this.diagonales());
        let contador = 0;
        let celdasVacias = [];
        let posicion = [];

        for(let linea of lineas)
        {            
            for(let celda of linea)
            {                
                if(celda.ocupada && celda.ficha == ficha)
                {
                    // se cuentan las celdas ocupadas con la ficha indicada
                    contador++;
                }
                else if(!celda.ocupada)
                {   
                    // se guarda la celda desocupada [x,x]
                    posicion = celda.posicion;  
                }             
            }

            if(contador === 2)
            {
                celdasVacias.push(posicion); // [x,x]
                contador = 0; 
            }
        
        }
        return celdasVacias;
    }

    public elegirCelda(){
        let celdasVacias = this.celdasParaCompletarLinea(this.fichaMaquina)
        if(celdasVacias.length == 0){
            celdasVacias = this.celdasParaCompletarLinea(this.fichaJugador);
        }
        return celdasVacias;
    }

    public jugadaComputadora(){
        let posicion;

        if(this.turno <= 9){
            let celdasVacias = this.elegirCelda(); // Se buscan celdas vacias para ganar o bloquear al jugador
            if(celdasVacias.length >= 1){
                posicion = celdasVacias[Math.floor(Math.random() * celdasVacias.length)]; 
                this.ponerFicha(this.fichaMaquina,posicion[0],posicion[1]); // posicion[0] = fila, posicion[1] = columna
            }
            else{
                if(!this.tablero[1][1].ocupada)
                {
                    this.ponerFicha(this.fichaMaquina, 1, 1);
                }
            }
            return posicion;
        }
    }

    public verificar(): boolean {
        if(this.tresEnLinea(this.fichaJugador))
        {
            this.ganador = Ganador.humano;
            return true;
        }
        else if(this.tresEnLinea(this.fichaMaquina))
        {   
            this.ganador = Ganador.maquina;
            return true
        }
        this.ganador = Ganador.vacio;
        return false;
    }
}

export enum Ficha{
    circulo = 'O',
    cruz = 'X',
    vacio = '-'
}

export enum Ganador{
    vacio,
    humano,
    maquina
}