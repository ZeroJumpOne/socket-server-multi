import { Ticket, Escritorio, Atender } from '../interfaces/interfaces';

export class Colas {

    private static _instance: Colas;

    folios: number = 0;
    ticket: Ticket[] = [];
    cajas: Escritorio[] = [];
    atendiendo: Atender[] = []; 

    constructor() {}

    public static get instance() {
        return this._instance || (this._instance = new this());
    }


    public agregarTicket(): Ticket {

        this.folios = this.folios + 1;

        const item: Ticket = {
            id: new Date().getTime().toString(),
            folio: this.folios,
            observacion: '[sin observacion]',
        };

        this.ticket.push( item );

        return item;        
    }

}