const { Talles } = require("../Models/Talle");
const { AltaBd,FiltrarBD,DeleteBd,UpdateBdTalle,ActivarBd,DesactivarBd} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {name}=req.body

   if(name){
      const existe= await Talles.findOne({where:{
         name: name
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El nombre de ${existe.name} ya existe`})
      }else{
         try {
            const DatoAlta= await AltaBd(req.body, Talles)
   
            console.log(DatoAlta)
            if(DatoAlta){
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear la talla')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
      const Error = [];

      if(!name){
         Error.push("Ingrese el nombre de la talla")
      }

 

      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {name} = req.body
   let DatosFiltrar;
   if(name){
      DatosFiltrar = await FiltrarBD(Talles,{},'name',name);
   }else{
    
      DatosFiltrar = await FiltrarBD(Talles,{})
   }
   res.status(200).json(DatosFiltrar)
}

const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,Talles)

      if(DatoEliminado){
       res.status(200).json({mensaje:'el talle fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro el talle a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdTalle(Talles,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'el talle fue actualizada correctamente'})
      }else{
         res.status(200).json({mensaje:'Error al actualizar el talle'})
      }
    }
}


const Activar = async (req,res)=>{
   const {id} = req.params
   if(id){
     const DatoActualizado = await ActivarBd(id,Talles)
     if(DatoActualizado){
        res.status(200).json({mensaje:'El talle fue activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error el talle ya se encuentra activado'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.params
   if(id){
      const DatoActualizado = await DesactivarBd(id,Talles)
      if(DatoActualizado){
        res.status(200).json({mensaje:'El talle fue desactivado con exito'})
      }else{
        res.status(400).json({mensaje:'Error el talle ya se encuentra desactivada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}
module.exports={Crear ,Filtrar,Eliminar,Editar,Activar,Desactivar}