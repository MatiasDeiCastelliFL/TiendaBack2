const {Router} = require('express')

const { AltaVentas,AnularVenta,FiltrarVenta} = require('../Controllers/DetalleVenta');

const RouterServer = Router();

RouterServer.post('/',AltaVentas);
RouterServer.get('/',AnularVenta);
RouterServer.get('/Filtrar',FiltrarVenta)


module.exports=RouterServer