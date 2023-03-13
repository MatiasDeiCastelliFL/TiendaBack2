const {Documentos} = require('../Models/Documento')


const { Categorias } = require("../Models/Categoria")
const { AltaBd,FiltrarBD,DeleteBd,UpdateBdTipo} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {nombre}=req.body

   if(nombre){
      const existe= await Documentos.findOne({where:{
         nombre: nombre
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El nombre de ${existe.nombre} ya existe`})
      }else{
         try {
            const DatoAlta= await AltaBd(req.body, Documentos)
   
            console.log(DatoAlta)
            if(DatoAlta){
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear tipo de documento')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
      const Error = [];

      if(!nombre){
         Error.push("Ingrese el nombre del tipo de documento")
      }
      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {nombre}=req.body
   let DatosFiltrar;
   if(nombre){
      
      DatosFiltrar= await FiltrarBD(Documentos,{},"nombre",nombre)
   }else{
      DatosFiltrar = await FiltrarBD(Documentos,{})
   }
   res.status(200).json(DatosFiltrar)
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdTipo(Documentos,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'El tipo de documento fue actualizado correctamente'})
      }else{
         res.status(200).json({mensaje:'Error al actualizar el tipo de documento'})
      }
    }
}



module.exports={Crear ,Filtrar,Editar}