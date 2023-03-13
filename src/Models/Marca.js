const {db,DataTypes}= require('../utils/database')

const Marcas= db.define('marcas',{
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
        type:DataTypes.TEXT,
        allowNull:false
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

module.exports= {Marcas}