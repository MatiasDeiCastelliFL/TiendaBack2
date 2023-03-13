const {db,DataTypes} = require("../utils/database")

const Detalle_Ingreso = db.define("detalles_ingresos",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad:{
        type:DataTypes.INTEGER,
        defaultValue:1
    },
    precio:{
        type:DataTypes.DOUBLE
    }

})

module.exports= {Detalle_Ingreso}