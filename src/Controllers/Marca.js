const { Marcas } = require("../Models/Marca");

const { AltaBd,FiltrarBD,DeleteBd,UpdateBdMarca,ActivarBd,DesactivarBd} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {name,descripcion}=req.body

   if(name && descripcion){
      const existe= await Marcas.findOne({where:{
         name: name
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El nombre de ${existe.name} ya existe`})
      }else{
         try {
            const DatoAlta= await AltaBd(req.body, Marcas)
   
            console.log(DatoAlta)
            if(DatoAlta){
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear la marca')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
      const Error = [];

      if(!name){
         Error.push("Ingrese el nombre de la marca")
      }

      if(!descripcion){
         Error.push("Ingrese una descripcion de la marca")
      }

      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {name} = req.body
   let DatosFiltrar;
   if(name){
      DatosFiltrar = await FiltrarBD(Marcas,{},'name',name);
   }else{
      DatosFiltrar = await FiltrarBD(Marcas,{})
   }
   res.status(200).json(DatosFiltrar)
}

const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,Marcas)

      if(DatoEliminado){
       res.status(200).json({mensaje:'La marca fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro la marca a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdMarca(Marcas,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La marca fue actualizada correctamente'})
      }else{
         res.status(200).json({mensaje:'Error al actualizar la marca'})
      }
    }
}

const Activar = async (req,res)=>{
   const {id} = req.params
   if(id){
     const DatoActualizado = await ActivarBd(id,Marcas)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La marca fue activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la marca ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.params
   if(id){
      const DatoActualizado = await DesactivarBd(id,Marcas)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La marca fue desactivado con exito'})
      }else{
         res.status(400).json({mensaje:'Error la marca ya se encuentra desactivada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}
module.exports={Crear ,Filtrar,Eliminar,Editar,Activar,Desactivar}