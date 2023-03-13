const {db,DataTypes} = require("../utils/database")

const Detalle_Venta = db.define("detalles_ventas",{
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


module.exports={Detalle_Venta}
