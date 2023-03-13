const {db,DataTypes}= require('../utils/database')

const Fotos = db.define("fotos", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})
module.exports= {Fotos};