export interface Ticket {
    id: string;
    folio: number;
    observacion?: string;
}

export interface Escritorio {
    id: string;
    escritorio: number;
    nombre?: string;
}

export interface Atender {
    id: string;
    ticket: Ticket;
    escritorio: Escritorio;
}
