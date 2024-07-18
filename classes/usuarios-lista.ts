import { Usuario } from "./usuario";

export default class UsuariosLista {

    private static _instance: UsuariosLista;
    private lista: Usuario[] = [];

    constructor() {}

    public agregar( usuario: Usuario): Usuario {
        this.lista.push( usuario );
        console.log(this.lista);       

        return usuario;
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public actualizarNombre( id: string, nombre: string ) {

        for( let usuario of this.lista) {
            if (usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('---- actualizando usuario ----');
        console.log(this.lista);
    }

    public get list() {
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');
    }

    public getUser( id: string ) {
        return this.lista.find( usuario => {
            return usuario.id === id;
        });
    }

    public getRoomUsers( sala: string ) {
        return this.lista.filter( usuario => {
            return usuario.sala === sala;
        });
    }

    public eliminar( id: string ) {
        const tempUser = this.getUser( id );

        this.lista = this.lista.filter( user => {
            return user.id !== id;
        });

        return tempUser;
    }

}