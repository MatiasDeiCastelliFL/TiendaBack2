const {db,DataTypes} = require('../utils/database')

const Proveedore= db.define('proveedores',{
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
        unique: true
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
        unique: true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    imagen:{
        type:DataTypes.STRING,
        unique:true
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

module.exports={Proveedore}