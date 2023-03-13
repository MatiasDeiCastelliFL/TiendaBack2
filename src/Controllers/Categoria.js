
const { Categorias } = require("../Models/Categoria")
const { AltaBd,FiltrarBD,DeleteBd,UpdateBdCategoria,ActivarBd,DesactivarBd} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {name,descripcion}=req.body

   if(name && descripcion){
      const existe= await Categorias.findOne({where:{
         name: name
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El nombre de ${existe.name} ya existe`})
      }else{
         try {
            const DatoAlta= await AltaBd(req.body, Categorias)
   
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
         Error.push("Ingrese el nombre de la categoria")
      }

      if(!descripcion){
         Error.push("Ingrese una descripcion de la categoria")
      }

      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {name}=req.body
   let DatosFiltrar;
   if(name){
      
      DatosFiltrar= await FiltrarBD(Categorias,{},"name",name)
   }else{
      DatosFiltrar = await FiltrarBD(Categorias,{})
   }
   res.status(200).json(DatosFiltrar)
}

const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,Categorias)

      if(DatoEliminado){
       res.status(200).json({mensaje:'La categoria fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro la categoria a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdCategoria(Categorias,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La categoria fue actualizada correctamente'})
      }else{
         res.status(400).json({mensaje:'Error al actualizar la categoria'})
      }
    }
}


const Activar = async (req,res)=>{
   const {id} = req.params
   if(id){
     const DatoActualizado = await ActivarBd(id,Categorias)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La categoria fue activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la categoria ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.params
   if(id){
      const DatoActualizado = await DesactivarBd(id,Categorias)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La categoria fue desactivado con exito'})
      }else{
         res.status(400).json({mensaje:'Error la categoria ya se encuentra desactivada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}
module.exports={Crear ,Filtrar,Eliminar,Editar,Activar,Desactivar}