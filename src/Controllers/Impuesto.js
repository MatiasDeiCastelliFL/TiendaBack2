

const { Impuesto } = require("../Models/Impuesto")
const { AltaBd,FiltrarBD,DeleteBd,UpdateBdImpuesto} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {impuestoTotalIva}=req.body

   if(impuestoTotalIva){
      const existe= await Impuesto.findOne({where:{
        impuestoTotalIva: impuestoTotalIva
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El impuesto ya se encuentra agregado ${existe.impuestoTotalIva} `})
      }else{
         try {
            const DatoAlta= await AltaBd(req.body,Impuesto)
   
            console.log(DatoAlta)
            if(DatoAlta){
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear el impuesto')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
      const Error = [];

      if(!impuestoTotalIva){
         Error.push("Error al crear el impuesto")
      }
      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {impuestoTotalIva} = req.body
   let DatosFiltrar;
   if(impuestoTotalIva){
      DatosFiltrar = await FiltrarBD(Impuesto,{},'impuestoTotalIva',impuestoTotalIva);
   }else{
      DatosFiltrar = await FiltrarBD(Impuesto,{})
   }
   res.status(200).json(DatosFiltrar)
}

const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,Impuesto)

      if(DatoEliminado){
       res.status(200).json({mensaje:'el impuesto fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro el impuesto a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdImpuesto(Impuesto,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'El impuesto fue actualizado correctamente'})
      }else{
         res.status(400).json({mensaje:'Error al actualizar el impuesto'})
      }
    }
}

module.exports={Crear ,Filtrar,Eliminar,Editar}