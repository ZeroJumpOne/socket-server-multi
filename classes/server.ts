import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';


export default class Server {

    private static _instance: Server;
    private listClients: [] = [];

    public app: express.Application = express();
    public port: number = SERVER_PORT;
    public io: socketIO.Server;

    private httpServer: http.Server;

    private constructor() {
        // esta parte la inicialice en la declaración.
        // this.app = express();
        // this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );

        this.io = socketIO( this.httpServer, { 
            cors: {
                origin: "http://localhost:4200",
            }
            
        });

        this.escucharSockets();
    }

    public static get instance() {

        return this._instance || (this._instance = new this());

    }

    

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', (client) => {

            // console.log('Cliente conectado'); 
            // console.log(client.id);           
                    

            // this.io.on('disconnect', () => {
            //     console.log('Cliente desconectado');    
            // });

            //Conectar cliente
            socket.conectar( client, this.io );

            //configurar usuario
            socket.configurarUsuario(client, this.io);

            //obtener usuarios
            socket.obtenerUsuarios(client,this.io);

            //Chat
            socket.mensaje(client, this.io);

            //Desconectar
            socket.desconectar(client, this.io);
        });        


    }

    start( callback: Function) {
    
        // this.app.listen( this.port, callback );
        this.httpServer.listen( this.port, callback );
    
    }

}
