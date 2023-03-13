const {Router} = require('express')

const { Crear,Eliminar,Editar,Activar,Desactivar} = require('../Controllers/Articulo');



const RouterServer = Router();
RouterServer.post('/',Crear);
RouterServer.delete('/',Eliminar);
RouterServer.put('/',Editar);
RouterServer.put('/activar',Activar)
RouterServer.put('/desactivar/:id',Desactivar)
module.exports= RouterServer