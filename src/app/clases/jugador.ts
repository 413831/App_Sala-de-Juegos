export class Jugador {

    public static CrearJugador(nombre: string, email: string, clave: string, pais: 
                string, jugados: number, ganados: number, perdidos: number): Jugador
    {
        let jugador = new Jugador();
        jugador.nombre = nombre;
        jugador.email = email;
        jugador.clave = clave;
        jugador.pais = pais;
        jugador.jugados = jugados;
        jugador.ganados = ganados;
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
}
