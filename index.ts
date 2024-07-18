import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors'


// const server = new Server(); 
const server = Server.instance; //patrón singlenton - unos sola instancia de servidor

//BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

//cors
server.app.use( cors({ origin: true, credentials: true }));

//rutas de servicios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});
    
