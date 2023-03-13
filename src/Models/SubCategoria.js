const {db,DataTypes}= require('../utils/database')

const SubCategorias= db.define('subCategorias',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})

module.exports= {SubCategorias}