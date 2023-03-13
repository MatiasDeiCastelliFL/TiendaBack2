const {Router} = require('express')

const { Crear,Filtrar,Editar,LoginBusquedaCliente,Activar,Desactivar,ActivarUsu,FiltrarCliente,EliminarCliente,AuntenticateCreate,filtrarClienteAuntenticacion} = require('../Controllers/Cliente');
const { upload } = require('../utils/multer');


const RouterServer = Router();
RouterServer.post('/',upload,Crear);
RouterServer.post('/Auntenticate',AuntenticateCreate);
RouterServer.get('/',Filtrar);
RouterServer.get("/Clients",FiltrarCliente)
RouterServer.get("/Comprobar",LoginBusquedaCliente)
RouterServer.put('/',upload,Editar);
RouterServer.put('/activar',Activar)
RouterServer.get('/activare',ActivarUsu)
RouterServer.put('/desactivar',Desactivar)
RouterServer.delete('/',EliminarCliente);
RouterServer.get('/FiltrarAuntenticado',filtrarClienteAuntenticacion)
module.exports= RouterServer

