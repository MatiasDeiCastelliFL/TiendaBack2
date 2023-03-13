
const { Rol } = require("../Models/Rol")
const { AltaBd,FiltrarBD,DeleteBd,UpdateBdRol,ActivarBd,DesactivarBd} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {name,descripcion}=req.body

   if(name && descripcion){
      const existe= await Rol.findOne({where:{
         name: name
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El nombre de ${existe.name} ya existe`})
      }else{
         try {
            const DatoAlta= await AltaBd(req.body, Rol)
   
            console.log(DatoAlta)
            if(DatoAlta){
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear la categoria')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
      const Error = [];

      if(!name){
         Error.push("Ingrese el nombre del rol")
      }

      if(!descripcion){
         Error.push("Ingrese una descripcion del rol")
      }

      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {name}=req.body
   let DatosFiltrar;
   if(name){
      
      DatosFiltrar= await FiltrarBD(Rol,{},"name",name)
   }else{
      DatosFiltrar = await FiltrarBD(Rol,{})
   }
   res.status(200).json(DatosFiltrar)
}

const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,Rol)

      if(DatoEliminado){
       res.status(200).json({mensaje:'El rol fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro el rol a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdRol(Rol,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'el rol fue actualizado correctamente'})
      }else{
         res.status(400).json({mensaje:'Error al actualizar el rol'})
      }
    }
}


const Activar = async (req,res)=>{
   const {id} = req.params
   if(id){
     const DatoActualizado = await ActivarBd(id,Rol)
     if(DatoActualizado){
        res.status(200).json({mensaje:'el rol fue activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error el rol ya se encuentra activado'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.params
   if(id){
      const DatoActualizado = await DesactivarBd(id,Rol)
      if(DatoActualizado){
         res.status(200).json({mensaje:'El rol fue desactivado con exito'})
      }else{
         res.status(400).json({mensaje:'Error el rol ya se encuentra desactivado'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}
module.exports={Crear ,Filtrar,Eliminar,Editar,Activar,Desactivar}