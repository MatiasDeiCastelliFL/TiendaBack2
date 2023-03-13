const {Router} = require('express')

const { Crear,Filtrar,Eliminar,Editar,Activar,Desactivar} = require('../Controllers/Talle');



const RouterServer = Router();
RouterServer.post('/',Crear);
RouterServer.get('/',Filtrar);
RouterServer.delete('/',Eliminar);
RouterServer.put('/',Editar);
RouterServer.put('/activar/:id',Activar)
RouterServer.put('/desactivar/:id',Desactivar)
module.exports= RouterServer