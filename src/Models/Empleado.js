const {db,DataTypes} = require('../utils/database')

const Empleado= db.define('empleados',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nro_Documento:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nroDireccion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    nombreUsuario:{
        type:DataTypes.STRING,

    },
    clave:{
        type:DataTypes.STRING,
    },
    palabraSecreta:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

module.exports={Empleado}