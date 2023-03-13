
//Importamos todos los routers
const {Router} = require('express');
const RouterServer = Router();

const RouterCategoria = require('./RutasCategoria')
const RouterSubCategoria = require('./RutaSubCategoria')
const RouterMarca = require('./RutasMarca')
const RouterTalle = require('./RutasTalles')
const RouterArticulo = require('./RutasArticulo')
const RouterFoto = require('./RutasFoto')
const RouterDocumento= require('./RutaDocumento')
const RouterRol = require('./RutaRol')
const RouterEmpleado= require('./RutaEmpleado')
const RouterCliente=require("./RutaCliente")
const RouterProveedor= require("./RutaProveedor")
const RouterImpuesto = require("./RutaImpuesto")
const RutaDetalleIngreso = require("./RutaDetalleIngreso")
const RutaDetalleVenta = require("./RutaDetalleVenta")
RouterServer.use('/Categoria', RouterCategoria)
RouterServer.use('/Sub', RouterSubCategoria)
RouterServer.use('/Marca',RouterMarca)
RouterServer.use('/Talle',RouterTalle)
RouterServer.use('/Articulo',RouterArticulo)
RouterServer.use('/Fotos',RouterFoto)
RouterServer.use('/Documento',RouterDocumento)
RouterServer.use('/Cliente',RouterCliente)
RouterServer.use('/Rol',RouterRol)
RouterServer.use('/Empleado',RouterEmpleado)
RouterServer.use('/Proveedor',RouterProveedor)
RouterServer.use('/Impuesto',RouterImpuesto)
RouterServer.use("/Ingresos",RutaDetalleIngreso)
RouterServer.use("/Ventas",RutaDetalleVenta)

module.exports= {RouterServer}