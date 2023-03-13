//Exportamos los datos y creamos sus variables para que se creen en la base de datos

const {Articulos} = require("../Articulo.js")
const {Talles} = require("../Talle.js")
const {SubCategorias}= require('../SubCategoria.js')
const {Categorias}= require('../Categoria.js')
const {Marcas} = require("../Marca.js")
const {Ingresos} = require("../Ingresos.js")
const {Detalle_Ingreso} = require("../Detalle_Ingreso.js")
const {Ventas} = require("../Ventas.js")
const {Detalle_Venta} = require("../Detalle_Venta.js")
const {Impuesto} = require("../Impuesto.js")
const {Documentos }= require("../Documento.js")
const {Clientes} = require("../Cliente.js")
const {Empleado} = require("../Empleado.js")
const {Rol} = require("../Rol.js")
const {Proveedore} = require("../Proveedores.js")
const { Fotos } = require("../Foto.js")




//Creamos las relaciones
const relacion = ()=>{

    const RelacionNxN=()=>{
        Articulos.belongsToMany(Talles,{ through: "Articulo_Talle" })
        Talles.belongsToMany(Articulos,{ through: "Articulo_Talle" })

        Articulos.belongsToMany(Ingresos,{through:Detalle_Ingreso})
        Ingresos.belongsToMany(Articulos,{through:Detalle_Ingreso})

        Ventas.belongsToMany(Articulos,{through:Detalle_Venta})
        Articulos.belongsToMany(Ventas,{through:Detalle_Venta})

        
    }

    const Relacion1Xn=()=>{
        SubCategorias.hasMany(Articulos)
        Articulos.belongsTo(SubCategorias)

        Categorias.hasMany(SubCategorias)
        SubCategorias.belongsTo(Categorias)
        
        Articulos.belongsTo(Marcas)
        Marcas.hasMany(Articulos)

        Documentos.hasMany(Clientes)
        Clientes.belongsTo(Documentos)

        Documentos.hasMany(Proveedore)
        Proveedore.belongsTo(Documentos)

        Articulos.hasMany(Fotos)
        Fotos.belongsTo(Articulos)

        Documentos.hasMany(Empleado)
        Empleado.belongsTo(Documentos)

        Rol.hasMany(Empleado)
        Empleado.belongsTo(Rol)

        Empleado.hasMany(Ingresos)
        Ingresos.belongsTo(Empleado)

        Clientes.hasMany(Ventas)
        Ventas.belongsTo(Clientes)

        Clientes.hasMany(Detalle_Venta)
        Detalle_Venta.belongsTo(Clientes)

        Empleado.hasMany(Ventas)
        Ventas.belongsTo(Empleado)

        Proveedore.hasMany(Ingresos)
        Ingresos.belongsTo(Proveedore)
    }

    const Relacion1X1=()=>{
        Impuesto.hasOne(Detalle_Venta);
        Detalle_Venta.belongsTo(Impuesto);

        Impuesto.hasOne(Detalle_Ingreso);
        Detalle_Ingreso.belongsTo(Impuesto);
    }

    RelacionNxN();
    Relacion1Xn();
    Relacion1X1();
}

module.exports={relacion}