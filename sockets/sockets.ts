import { Socket } from "socket.io";
import socketIO from 'socket.io';
import UsuariosLista from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";
import { Mapa } from "../classes/mapa";
import { Marcador } from "../classes/marcador";
import { Colas } from "../classes/colas";
import { Atender, Escritorio, Ticket } from "../interfaces/interfaces";

export const usuariosConectados = UsuariosLista.instance; //Patron singlenton, una sola instancia de la lista de usuarios.
export const mapa = new Mapa();
export const cola = Colas.instance;


// Manejo de colas
export const colasSockets = (client: Socket, io: socketIO.Server) => {

    client.on('new-ticket', (payload, callback: Function) => {
        console.log('payload', payload);

        console.log('Creando ticket');
        const newTicket = cola.agregarTicket();

        console.log(newTicket);

        callback(newTicket);
        //io.to(client.id).emit('my-ticket', newTicket);
        io.emit('maximo', cola.getMaximo());
    });

    client.on('on-desk', (escritorio: number) => {
        console.log('on desk', escritorio);

        console.log('Creando escritorio');
        cola.agregarEscritorio(escritorio);
    });

    client.on('attend-desk', (escritorio, callback: Function) => {
        console.log('attend desk', escritorio);
        const objDesk: Escritorio = cola.getEscritorio(escritorio);
        // console.log({objDesk});

        if (!objDesk) return; //No hacer nada si no hay escritorio

        const objTicket: Ticket = cola.siguienteTicket();

        //Se agrega registro de atencion
        if (objTicket.id !== '') {

            console.log('Agregar registro de atencion');
            cola.agregarAtender(objDesk, objTicket);

            io.emit('attend', cola.getAtenciones());
            //client.emit('attend', cola.getAtenciones() );
        }

        callback(objTicket);
    });

    client.on('auth-audio', (autorizacion: boolean) => {
        console.log({autorizacion});
        
        cola.audio(autorizacion);

        // se emite a todos excepto al que lo creo, por eso el broadcast
        client.broadcast.emit('ok-audio');
    });
}

// eventos de mapa
export const mapaSockets = (cliente: Socket, io: socketIO.Server) => {
    // console.log('entro en mapa');


    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador(marcador);

        // se emite a todos excepto al que lo creo, por eso el broadcast
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });


    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador(id);

        // se emite a todos excepto al que lo creo, por eso el broadcast
        cliente.broadcast.emit('marcador-borrar', id);
    });

    cliente.on('marcador-mover', (marcador: Marcador) => {
        mapa.moverMarcador(marcador);
        // console.log(marcador);

        // se emite a todos excepto al que lo creo, por eso el broadcast
        cliente.broadcast.emit('marcador-mover', marcador);
    });


}


// eventos usuarios
export const conectar = (client: Socket, io: socketIO.Server) => {

    const usuario: Usuario = new Usuario(client.id);
    usuariosConectados.agregar(usuario);

    io.to(client.id).emit('my-id', client.id);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        const tmp: Usuario | undefined = usuariosConectados.eliminar(cliente.id);
        console.log(`Cliente desconectado ${tmp!.id} [${tmp!.nombre}]`);
    });
}

export const mensaje = (client: Socket, io: socketIO.Server) => {

    client.on('chat', (payload) => {
        console.log(payload);

        io.emit('chat-new', payload);
    });
}

export const configurarUsuario = (client: Socket, io: socketIO.Server) => {
    client.on('configurar-usuario', (payload, callback: Function) => {
        // console.log({ usuario: payload });  
        usuariosConectados.actualizarNombre(client.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.list);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado.`,
        })
    })
}

//Obtener usuarios
export const obtenerUsuarios = (client: Socket, io: socketIO.Server) => {
    client.on('obtener-usuarios', () => {
        io.to(client.id).emit('usuarios-activos', usuariosConectados.list);
    })
}