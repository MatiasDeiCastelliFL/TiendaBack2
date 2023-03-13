const {Router} = require('express')

const { Crear,Editar,Filtrar} = require('../Controllers/TipoDocumento');



const RouterServer = Router();
RouterServer.post('/',Crear);

RouterServer.put('/',Editar);
RouterServer.get('/',Filtrar);
RouterServer.get('/name',Filtrar);
module.exports= RouterServer