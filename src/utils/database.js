const {Sequelize, DataTypes} = require('sequelize');
require("dotenv").config();
//Establecemos la conexion
const {base_dato_mysql,username_db_mysql,password_db_mysql}=process.env

const db= new Sequelize(base_dato_mysql,username_db_mysql,password_db_mysql,{
    host:'localhost',
    dialect:'mysql',
    logging:false,
    dialectOptions:{
        bigNumberStrings:false
    }
});

module.exports={db,DataTypes}


