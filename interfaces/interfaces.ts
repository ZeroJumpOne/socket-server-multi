export interface Ticket {
    id: string;
    folio: number;
    observacion: string;
}

export interface Escritorio {
    id: string;
    caja: number;
    nombre?: string;
}

export interface Atender {
    ticket: Ticket;
    escritorio: Escritorio;
}
