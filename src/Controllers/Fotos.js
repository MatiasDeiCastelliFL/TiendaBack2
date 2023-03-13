const { Articulos } = require("../Models/Articulo");
const { Fotos } = require("../Models/Foto");
const { Marcas } = require("../Models/Marca");
const { SubCategorias } = require("../Models/SubCategoria");
const { Talles } = require("../Models/Talle");
const { AltaBdFoto,FiltrarArticulo,UpdateBdFotos } = require("../Services/DatoBd");


const Crear= async (req,res) =>{
    const {stock,articuloId}=req.body
    const {path}=req.file

    if(path && stock && articuloId){
       const existe= await Fotos.findOne({where:{
          imagen: path
       }})
    
       if(existe !== null){
          res.status(400).json({message:`la imagen del articulo ya existe`})
       }else{
          try {
             const DatoAlta= await AltaBdFoto(req.body, Fotos,path)
             if(DatoAlta){
                res.status(201).json(DatoAlta)
             }else{
                res.status(400).json('Error al subir la foto')
             }
          } catch (error) {
             console.log(error)
          }
       }    
    }else{
       const Error = [];
 
       if(!path){
          Error.push("Ingrese la imagen del articulo")
       }
 
       if(!stock){
          Error.push("Ingrese el stock del articulo")
       }
 
       if(!articuloId){
         Error.push("Seleccione el articulo al que pertence")
       }
       res.status(400).json(Error)
    }
 }

 const Editar = async (req,res)=>{
   
   
   if(req.body.id){
      const {path}= req.file
      const DatoActualizado = await UpdateBdFotos(Fotos,req.body,path)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La imagen y stock del articulo fue actualizado correctamente'})
     }else{
        res.status(200).json({mensaje:'Error al actualizar al actualizar la imagen y stock articulo'})
     }
   }
}

 const Filtrar = async(req,res)=>{
    const {codigo,marcaId,talleId,precio}= req.query
    const FiltrarArticulos= await FiltrarArticulo(Articulos,Talles,Marcas,SubCategorias,Fotos,codigo,marcaId,talleId,precio)
    res.status(200).json(FiltrarArticulos)
 }

 module.exports={Crear,Filtrar,Editar}