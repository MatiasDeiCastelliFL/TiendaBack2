
const {Router} = require('express');
const { Crear, Filtrar,Editar } = require('../Controllers/Fotos');

const { upload } = require('../utils/multer');

const RouterServer = Router();
RouterServer.post('/',upload,Crear);
RouterServer.get('/',Filtrar)
RouterServer.put('/',upload,Editar);
module.exports= RouterServer