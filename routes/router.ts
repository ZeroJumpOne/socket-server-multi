import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import UsuariosLista from '../classes/usuarios-lista';
import { GraficaData } from '../classes/grafica';
import { mapa } from '../sockets/sockets';

export const router = Router();


//mapa

router.get('/mapa', (req: Request, res: Response) => {
    res.json(mapa.marcadores);
})


// grafica

const grafica = new GraficaData;

router.get('/grafica', (req: Request, res: Response) => {

    res.json(grafica.dataGrafica);
})

router.post('/grafica', (req: Request, res: Response) => {
    // console.log(req.body);
    const { opcion, valor } = req.body;

    grafica.incrementarValor( Number(opcion), Number(valor) );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.dataGrafica);

    res.json(grafica.dataGrafica);

})

router.post('/mensajes/:id', (req: Request, res: Response) => {
    // console.log(req.body);
    const { cuerpo, de } = req.body;
    const id = req.params.id;

    const payload = {
        de: de,
        cuerpo: cuerpo,
    };

    const server = Server.instance;

    server.io.in(id).emit('chat-private', payload);

    res.json({
        ok: true,
        cuerpo: cuerpo,
        de: de,
        msj: 'POST - listo!!!',
        id: id,
    })


})

//servicios para obtener todos los id usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;
    const listUsers = UsuariosLista.instance;



    // server.io.clients((err: any, clientes: string[]) => {

    //     if (err) {
    //         return res.json({
    //             ok: false,
    //             err: err,
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         clientes: clientes,    
    //     });
    // });

    if (listUsers.list) {
        console.log(listUsers.list);
        const onlyIds = listUsers.list.map((user) => user.id);
        console.log({ onlyIds });

        return res.json({
            ok: true,
            clientes: onlyIds,

        });
    } else {
        return res.json({
            ok: false,
            err: 'No hay ningun usuario conectado',
        });
    }
});
//Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    const listUsers = UsuariosLista.instance;

    if (listUsers.list) {
        console.log(listUsers.list);

        return res.json({
            ok: true,
            clientes: listUsers.list,
        });
    } else {
        return res.json({
            ok: false,
            err: 'No hay ningun usuario conectado',
        });
    }

});






});

export default router;