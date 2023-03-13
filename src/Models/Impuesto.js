const { DOUBLE } = require("sequelize")
const {db,DataTypes} = require("../utils/database")

const Impuesto= db.define("impuestos",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    impuestoTotalIva:{
        type:DataTypes.DOUBLE
    }
})

module.exports={Impuesto}