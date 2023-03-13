const {db,DataTypes}= require('../utils/database')

const Talles = db.define('talles',{
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

module.exports= {Talles}