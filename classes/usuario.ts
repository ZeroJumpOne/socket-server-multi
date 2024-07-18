export class Usuario {

    public id: string;
    public nombre: string = 'sin-nombre';
    public sala: string = 'sin-sala';

    constructor( id: string) {
        this.id = id;
    }

}