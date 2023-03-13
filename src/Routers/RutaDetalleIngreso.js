const {Router} = require('express')

const { AltaIngreso,AnularIngresos, Filtrare} = require('../Controllers/DetalleIngresos');

// ,Filtrar,Editar,Activar,Desactivar,ActivarUsu


const RouterServer = Router();
RouterServer.post('/',AltaIngreso);
RouterServer.get('/',AnularIngresos);
RouterServer.get('/Filtrar',Filtrare)
// RouterServer.put('/',upload,Editar);
// RouterServer.put('/activar/:id',Activar)
// RouterServer.get('/activare',ActivarUsu)
// RouterServer.put('/desactivar/:id',Desactivar)
module.exports= RouterServer