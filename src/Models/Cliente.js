const {db,DataTypes} = require('../utils/database')

const Clientes= db.define('clientes',{
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
    telefono:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    nombreUsuario:{
        type:DataTypes.STRING,
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    clave:{
        type:DataTypes.STRING,
        allowNull:true
    },
    palabraSecreta:{
        type:DataTypes.STRING,
        allowNull:true
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    activoAutenticador:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    }
    
})

module.exports={Clientes}