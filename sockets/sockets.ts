import { Socket } from "socket.io";
import socketIO from 'socket.io';
import UsuariosLista from "../classes/usuarios-lista";
import { Usuario } from "../classes/usuario";

export const usuariosConectados = UsuariosLista.instance; //Patron singlenton, una sola instancia de la lista de usuarios.

export const conectar = (client: Socket, io: socketIO) => {

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