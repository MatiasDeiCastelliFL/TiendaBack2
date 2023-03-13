
const { Articulos } = require("../Models/Articulo")
const { Fotos } = require("../Models/Foto")

const {DeleteBd,UpdateBdArticulo,ActivarBd,DesactivarBd,ArticuloFoto,AltaArticulo} = require("../Services/DatoBd")


const Crear= async (req,res) =>{

   const {codigo,descripcion,sexo,precio,subCategoriaId,marcaId,talleId}=req.body

   if(codigo && descripcion && sexo && subCategoriaId && marcaId,talleId.length>0,precio){
      const existe= await Articulos.findOne({where:{
         codigo: codigo
      }})
   
      if(existe !== null){
         res.status(400).json({message:`El nombre de ${existe.name} ya existe`})
      }else{
         try {
            const DatoAlta= await AltaArticulo(req.body, Articulos)
   
            console.log(DatoAlta)
            if(DatoAlta){
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear el articulo')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
      const Error = [];


      if(!talleId){
        Error.push("Ingrese el o los talles perteneciente al articulos");
      }

      if(!codigo){
         Error.push("Ingrese el codigo del articulo");
      }

      if(!descripcion){
         Error.push("Ingrese una descripcion del articulo");
      }

      if(!sexo){
        Error.push("Ingrese una descripcion del articulo");
      }

      if(!subCategoriaId){
        Error.push("Ingrese la subcategoria al pertenece el articulo");
      }

      if(!marcaId){
        Error.push("Ingrese la marca al que pertenece el articulo");
      }

      if(!precio){
         Error.push("Ingrese el precio del articulo");
      }

      res.status(400).json(Error)
   }
  
}
const Eliminar = async(req,res)=>{

   const {id}= req.body

   if(id){

      const DatoEliminado = await DeleteBd(id,Articulos)

      if(DatoEliminado){
       res.status(200).json({mensaje:'El articulo fue eliminado con exito'})
      }else{
       res.status(400).json({mensaje:'No se encontro el articulo a eliminar'})
      }
   }else{
      res.status(400).json({mensaje:"ingrese una id"})
   }
}

const Editar = async (req,res)=>{
    const {id} = req.body
    if(id){
      const DatoActualizado = await UpdateBdArticulo(Articulos,req.body)
      if(DatoActualizado){
         res.status(200).json({mensaje:'El articulo fue actualizado correctamente'})
      }else{
         res.status(200).json({mensaje:'Error al actualizar el articulo'})
      }
    }
}

const Activar = async (req,res)=>{
    const {id} = req.query
    if(id){
      const FitrarImagen = await ArticuloFoto(Fotos,id)

      if(FitrarImagen.length>0){
        const DatoActualizado = await ActivarBd(id,Articulos)
        if(DatoActualizado){
           res.status(200).json({mensaje:'El articulo fue activado con exito'})
        }else{
           res.status(400).json({mensaje:'Error el articulo ya se encuentra activada'})
        }
      }else{
        res.status(400).json({mensaje:'Error al activar articulo. El articulo no cuenta con una imagen'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }
 }
 
 const Desactivar = async (req,res)=>{
    const {id} = req.params
    if(id){
       const DatoActualizado = await DesactivarBd(id,Articulos)
       if(DatoActualizado){
          res.status(200).json({mensaje:'El articulo fue desactivado con exito'})
       }else{
          res.status(400).json({mensaje:'Error el articulo ya se encuentra desactivado'})
       }
     }else{
        res.status(400).json({mensaje:'Ingrese una id'})
     }
 
 }

module.exports={Crear,Eliminar,Editar,Activar,Desactivar}