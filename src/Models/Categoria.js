const {db,DataTypes}= require('../utils/database')

const Categorias= db.define('categorias',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

module.exports= {Categorias}