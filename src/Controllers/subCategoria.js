const { Categorias } = require("../Models/Categoria")
const { SubCategorias } = require("../Models/SubCategoria")


const { AltaBd,FiltrarBD,DeleteBd,UpdateBdSubcategoria,ActivarBd,DesactivarBd} = require("../Services/DatoBd")
const Crear= async (req,res) =>{

   const {name, categoriaId}=req.body

   if(name && categoriaId){
    const existe= await SubCategorias.findOne({where:{
        name: name
     }})
  
     if(existe !== null){
        res.status(400).json({message:`El nombre de ${existe.name} ya existe`})
     }else{
        try {
           const DatoAlta= await AltaBd(req.body, SubCategorias)
  
           console.log(DatoAlta)
           if(DatoAlta){
              res.status(201).json(DatoAlta)
           }else{
              res.status(400).json('Error al crear la subCategoria')
           }
        } catch (error) {
           console.log(error)
        }
     }
   }else{
        const Error = []

        if(!name){
            Error.push("Ingrese el nombre")
        }

        if(!categoriaId){
            Error.push("Ingrese una categoria")
        }

        res.status(400).json(Error)
   }
   
}

const Filtrar = async (req,res)=>{
 
   const {name,categoriaId}= req.body
   let DatosFiltrar;
   if(name){
      DatosFiltrar = await FiltrarBD(SubCategorias,Categorias,"name",name)
      res.status(200).json(DatosFiltrar)
   }else{
      if(categoriaId){
         DatosFiltrar = await FiltrarBD(SubCategorias,Categorias,"categoriaId",categoriaId)
         res.status(200).json(DatosFiltrar)
      }else{
         DatosFiltrar = await FiltrarBD(SubCategorias,{})
         res.status(200).json(DatosFiltrar)
      } 
   }
}

const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,SubCategorias)

      if(DatoEliminado){
       res.status(200).json({mensaje:'La subCategoria fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro la subCategoria a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdSubcategoria(SubCategorias,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La subCategoria fue actualizada correctamente'})
      }else{
         res.status(400).json({mensaje:'Error al actualizar la subCategoria'})
      }
    }
}

const Activar = async (req,res)=>{
    const {id} = req.params
    if(id){
      const DatoActualizado = await ActivarBd(id,SubCategorias)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La Subcategoria fue activado con exito'})
      }else{
         res.status(400).json({mensaje:'Error la Subcategoria ya se encuentra activada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }
}
 
const Desactivar = async (req,res)=>{
    const {id} = req.params
    if(id){
       const DatoActualizado = await DesactivarBd(id,SubCategorias)
       if(DatoActualizado){
          res.status(200).json({mensaje:'La SubCategoria fue desactivado con exito'})
       }else{
          res.status(400).json({mensaje:'Error la SubCategoria ya se encuentra desactivada'})
       }
     }else{
        res.status(400).json({mensaje:'Ingrese una id'})
     }
 
}

module.exports={Crear ,Filtrar,Eliminar,Editar,Activar,Desactivar}