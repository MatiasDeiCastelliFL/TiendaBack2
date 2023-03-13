const {Router} = require('express')

const { Crear,Filtrar,Eliminar,Editar} = require('../Controllers/Impuesto');



const RouterServer = Router();
RouterServer.post('/',Crear);
RouterServer.get('/',Filtrar);
RouterServer.delete('/',Eliminar);
RouterServer.put('/',Editar);
module.exports= RouterServer