const express = require("express")
const cors= require("cors")
const morgan= require("morgan");
const {RouterServer} = require("./Routers/Rutas.js");

require("dotenv").config();
const server = express();
server.use(cors());
server.set("port",process.env.PORT || 3001);
server.use(morgan("dev"));
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/', RouterServer)
module.exports={server}