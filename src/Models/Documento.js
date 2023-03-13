const {db,DataTypes}= require('../utils/database')

const Documentos = db.define("documentos",{

    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type:DataTypes.STRING
    }
})

module.exports={Documentos}