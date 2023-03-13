
const path = require("path");
const { recibirEmailProveedor } = require("../middleware/enviarCorreo");
const { Documentos } = require("../Models/Documento");
const { Proveedore } = require("../Models/Proveedores");
const { Rol } = require("../Models/Rol");
const { FiltrarEmpleado,ActivarBd,ActivarBdcuenta,DesactivarBd, AltaBdProveedor, UpdateBdEmpleado} = require("../Services/DatoBd")

const Crear= async (req,res) =>{

   const {nombre,apellido,nro_Documento,direccion,nroDireccion,telefono,email,documentoId}=req.body

 
   const Error = [];
   if(nombre && apellido && nro_Documento && direccion && nroDireccion && telefono && email  && documentoId){
      const existeDocumento= await Proveedore.findOne({where:{
         nro_Documento: nro_Documento
      }});

      const existeCorreo = await Proveedore.findOne({where:{
        email:email
      }});

      const existeTelefono= await Proveedore.findOne({
        where:{
            telefono:telefono
        }
      })

   
      if(existeDocumento !== null || existeTelefono!=null || existeCorreo !=null){

         if(existeDocumento != null){
            Error.push("El numero de documento ya existe");
         }

         if(existeTelefono != null){
            Error.push("El numero de telefono ya existe");
         }


         if(existeCorreo != null){
            Error.push("la dirrecion de correo ya existe")
         }

        
         res.status(400).json(Error)
      }else{
         try {
            const path =req.file?.path
            const DatoAlta= await AltaBdProveedor(req.body,Proveedore,path)
            if(DatoAlta){
                recibirEmailProveedor(email)
               res.status(201).json(DatoAlta)
            }else{
               res.status(400).json('Error al crear la cuenta')
            }
         } catch (error) {
            console.log(error)
         }
      }    
   }else{
    
      if(!nombre){
         Error.push("Complete el campo de nombre")
      }

      if(!apellido){
         Error.push("Complete el campo de apellido")
      }
      if(!nro_Documento){
        Error.push("Complete el campo de numero de documento")
     }

     if(!direccion){
        Error.push("Complete el campo de direccion")
     }
     if(!nroDireccion){
        Error.push("Complete el campo de numero de direccion")
     }
    
    if(!telefono){
       Error.push("Complete el campo de numero de telefono")
    }

    if(!email){
       Error.push("Complete el campo de email")
    }
    if(!nombreUsuario){
        
        Error.push("Complete el campo de nombre de usuario")
     }

     if(!clave){
        Error.push("Complete el campo de la contraseña")
     }

     if(!documentoId){
        Error.push("Complete el campo de tipo de documento")
     }


     if(!roleId){
        Error.push("Complete el campo de rol")
     }
      res.status(400).json(Error)
   }
  
}

const Filtrar = async (req,res)=>{

   const {nro_Documento,email}=req.body
   let DatosFiltrar;
   if(nro_Documento){
      
      DatosFiltrar= await FiltrarEmpleado(Proveedore,Documentos,Rol,"nro_Documento",nro_Documento)
   }else{

      if(email){
        DatosFiltrar = await FiltrarEmpleado(Proveedore,Documentos,Rol,"email",email)
      }else{
        DatosFiltrar = await FiltrarEmpleado(Proveedore,Documentos,Rol)
      }
   }
   res.status(200).json(DatosFiltrar)
}



const Editar = async (req,res)=>{
    const id = req.body
    const {path}= req.file
   
    if(id){
      const DatoActualizado = await UpdateBdEmpleado(Proveedore,req.body,path)
      if(DatoActualizado){
         res.status(200).json({mensaje:'actualizacion completado'})
      }else{
         res.status(400).json({mensaje:'Error al actualizar la cuenta'})
      }
    }else{
        res.status(400).json({mensaje:'Ingrese el id'})
    }
}


const ActivarUsu = async (req,res)=>{
   const {email} = req.query
   if(email){
      console.log("llegue")
     const DatoActualizado = await ActivarBdcuenta(email,Proveedore)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La cuenta del proveedor se a activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la cuenta del proveedor ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una correo'})
   }
}

const Activar = async (req,res)=>{
   const {id} = req.params
   console.log(id)
   if(id){
     const DatoActualizado = await ActivarBd(id,Proveedore)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La cuenta del proveedor se a activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la cuenta del proveedor ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.params
   if(id){
      const DatoActualizado = await DesactivarBd(id,Proveedore)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La cuenta del proveedor fue desactivada con exito'})
      }else{
         res.status(400).json({mensaje:'Error al  desactivar la cuenta del proveedor ya se encuentra desactivada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}
module.exports={Crear ,Filtrar,Editar,Activar,Desactivar,ActivarUsu}