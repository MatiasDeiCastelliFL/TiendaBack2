const {Router} = require('express')

const { Crear,Filtrar,Editar,Activar,ActivarUsu,Desactivar,LoginBusqueda} = require('../Controllers/Empleado');
const { upload } = require('../utils/multer');



const RouterServer = Router();

RouterServer.post('/',upload,Crear);
RouterServer.get('/',Filtrar);
RouterServer.get('/Comprobar',LoginBusqueda);
RouterServer.put('/',upload,Editar);
RouterServer.put('/activar/:id',Activar)
RouterServer.get('/activare',ActivarUsu)
RouterServer.put('/desactivar/:id',Desactivar)
module.exports= RouterServer

