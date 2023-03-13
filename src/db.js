const {server}= require('./app');
const { relacion } = require('./Models/Relaciones/Relaciones');
const { db } = require('./utils/database')
const startServer = async()=>{
    try {
        await db.authenticate();
       
        relacion();
        await db.sync({force:false}).then(()=>{

            const PORT=process.env.PORT || 4000;
            server.listen(PORT,()=>{
                console.log('Servidor levantado con express en el puerto', PORT);
            })
        });
     
    } catch (error) {
        console.log(error)
    } 
}

startServer();