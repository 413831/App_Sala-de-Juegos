export class Jugador {

    public static ParseJugador(array: any)
    {
        console.info('Array de Object: ' + array);
        let jugadores;
        
        array.map((elemento: Jugador, index ) => {
            jugadores.push(this.CrearJugador(index, elemento.nombre, elemento.email,
                                            elemento.clave, elemento.pais, elemento.jugados,
                                            elemento.ganados, elemento.perdidos));
        })
        return jugadores;
    }

    public static CrearJugador(id: string, nombre?: string, email?: string, clave?: string, pais?:string,
                             jugados?: number, ganados?: number, perdidos?: number, empatados?: number): Jugador
    {
        let jugador = new Jugador();
        jugador.id = id;
        jugador.nombre = nombre;
        jugador.email = email;
        jugador.clave = clave;
        jugador.pais = pais;
        jugador.jugados = jugados;
        jugador.ganados = ganados;
        jugador.empatados = empatados;
        jugador.perdidos = perdidos;   

        return jugador;
    }

    id: string ;
    nombre: string;
    email: string;
    clave: string;
    pais: string;
    jugados: number;
    ganados: number;
    perdidos: number;
    empatados: number;
}
