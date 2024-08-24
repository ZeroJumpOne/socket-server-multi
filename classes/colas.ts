import { Ticket, Escritorio, Atender } from '../interfaces/interfaces';

export class Colas {

    private static _instance: Colas;

    folios: number = 0;
    tickets: Ticket[] = [];
    desks: Escritorio[] = [];
    atendiendo: Atender[] = []; 
    private autorizacionAudio: boolean = false;

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

        this.tickets.push( item );

        return item;        
    }

    public agregarEscritorio(desk: number) {

        const item: Escritorio = {
            id: new Date().getTime().toString(),
            escritorio: desk,
            nombre: '[sin nombre]',
        }

        this.desks.push(item);        
    }

    public agregarAtender(escritorio: Escritorio, ticket: Ticket) {

        let newsAttends: Atender[] = this.atendiendo.filter( (item) => item.escritorio.id !== escritorio.id );
        
        console.log({newsAttends});

        const atender: Atender = {
            id: new Date().getTime().toString(),
            escritorio: escritorio,
            ticket: ticket,
        }

        newsAttends.unshift(atender);

        this.atendiendo = newsAttends;
    }

    public siguienteTicket(): Ticket {
        console.log(this.tickets);

        //primeras entradas, primeras salidas, regresa el elemento primero y lo elimina del arreglo
        let cola: Ticket | undefined = this.tickets.shift();

        if (!cola) {
            cola = {
                id: '',
                folio: 0,
            }
        }        

        return cola;
    }

    public getEscritorio(escritorio: number): Escritorio {

        let items : Escritorio[] = this.desks.filter( (item) => {
            if (item.escritorio === escritorio) {
                return item;
            }
        });

        //arreglo vacio
        // console.log(items);
        
        if (!items) {
            return {id: '', escritorio: 0};
        }

        return items[0];
    }

    public getAtenciones(): Atender[] {
        return this.atendiendo;
    }

    public getMaximo(): number {
        return this.folios;
    }

    public audio(autorizacion: boolean) {
        this.autorizacionAudio = autorizacion;
    }

}