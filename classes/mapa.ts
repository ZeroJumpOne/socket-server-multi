import { Marcador } from "./marcador";


export class Mapa {

    private misMarcadores: { [key: string]: Marcador } = {
        '1': {
            id: '1',
            nombre: 'Isaac Julio',
            lat: 20.616574,
            lng: -103.241276,
            color: '#dd8fee'
        },
        '2': {
            id: '2',
            nombre: 'Sarai',
            lat: 20.613464,
            lng: -103.243627,
            color: '#790af0'
        },
        '3': {
            id: '3',
            nombre: 'Orlando',
            lat: 20.614306,
            lng: -103.239936,
            color: '#19884b'
        }
    };

    constructor() { }

    get marcadores() {
        return this.misMarcadores;
    }

    public borrarMarcador(id: string) {
        delete this.misMarcadores[id];

        return this.marcadores;
    }

    public moverMarcador(marcador: Marcador) {
        this.marcadores[marcador.id].lng = marcador.lng;
        this.marcadores[marcador.id].lat = marcador.lat;
    }

    public agregarMarcador( marcador: Marcador) {
        this.marcadores[ marcador.id ] = marcador;
        console.log(this.marcadores);        
    }





}