import { Socket } from "socket.io";
import socketIO from 'socket.io';
import UsuariosLista from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";
import { Mapa } from "../classes/mapa";
import { Marcador } from "../classes/marcador";

export const usuariosConectados = UsuariosLista.instance; //Patron singlenton, una sola instancia de la lista de usuarios.
export const mapa = new Mapa();

// eventos de mapa
export const mapaSockets = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador(marcador);

        // se emite a todos excepto al que lo creo, por eso el broadcast
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });


    cliente.on('marcador-borrar', ( id: string ) => {
        mapa.borrarMarcador( id );

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

    const usuario: Usuario = new Usuario( client.id );
    usuariosConectados.agregar( usuario );
};

export const desconectar = (cliente: Socket, io: socketIO.Server ) => {

    cliente.on('disconnect', () => {
        const tmp: Usuario | undefined = usuariosConectados.eliminar(cliente.id);
        console.log(`Cliente desconectado ${ tmp!.id } [${ tmp!.nombre }]`);     
        
        io.emit('usuarios-activos', usuariosConectados.list);
    });
}

export const mensaje = (client: Socket, io: socketIO.Server ) => {

    client.on('chat', ( payload ) => {
        console.log(payload);

        io.emit('chat-new', payload);
    });
}

export const configurarUsuario = (client: Socket, io: socketIO.Server) => {
    client.on('configurar-usuario', ( payload, callback: Function ) => {
        // console.log({ usuario: payload });  
        usuariosConectados.actualizarNombre( client.id, payload.nombre );
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