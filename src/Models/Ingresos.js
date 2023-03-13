const {db,DataTypes}=require('../utils/database')

 

const Ingresos = db.define("ingresos",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fechaIngreso:{
        type:DataTypes.DATEONLY,
        defaultValue:DataTypes.NOW
    },
    total:{
        type:DataTypes.DOUBLE
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
})


module.exports= {Ingresos};