import { Marcador } from "./marcador";


export class Mapa {

    private misMarcadores: { [key: string]: Marcador } = {
        '1': {
            id: '1',
            nombre: 'Isaac Julio',
            lng: -75.75512993582937,
            lat: 45.349977429009954,
            color: '#dd8fee'
        },
        '2': {
            id: '2',
            nombre: 'Sarai',
            lng: -75.75195645527508,
            lat: 45.351584045823756,
            color: '#790af0'
        },
        '3': {
            id: '3',
            nombre: 'Orlando',
            lng: -75.75900589557777,
            lat: 45.34794635758547,
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