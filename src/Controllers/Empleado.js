// const bcryptjs= require('bcryptjs');
// const {encrypt,decrypt} = require('ncrypt-js');

const path = require("path");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
const { recibirEmail } = require("../middleware/enviarCorreo");
const { Documentos } = require("../Models/Documento");
const { Empleado } = require("../Models/Empleado");
const { Rol } = require("../Models/Rol");
const { FiltrarEmpleado,ActivarBd,ActivarBdcuenta,DesactivarBd, AltaBdEmpleado, UpdateBdEmpleado,comprobarEmpleado} = require("../Services/DatoBd");
const { json } = require("sequelize");
const { Clientes } = require("../Models/Cliente");


const Crear= async (req,res) =>{

   const {nombre,apellido,nro_Documento,direccion,nroDireccion,telefono,email,nombreUsuario,clave,palabraSecreta,documentoId,roleId}=req.body

   let existeCorreo;
   
   const Error = [];
   if(nombre && apellido && nro_Documento && direccion && nroDireccion && telefono && email && nombreUsuario && clave && palabraSecreta && documentoId && roleId){
      const existeDocumento= await Empleado.findOne({where:{
         nro_Documento: nro_Documento
      }});
      
      existeCorreo = await Empleado.findOne({where:{
        email:email
      }});

      if(existeCorreo==null){
         existeCorreo = await Clientes.findOne({where:{
            email:email
         }})
      }

      const existeTelefono= await Empleado.findOne({
        where:{
            telefono:telefono
        }
      })

      const existeNombreUsuario= await Empleado.findOne({
        where:{
            nombreUsuario:nombreUsuario
        }
      })
   
      if(existeDocumento !== null || existeTelefono!=null || existeCorreo !=null || existeNombreUsuario != null){

         if(existeDocumento != null){
            Error.push("El numero de documento ya existe");
         }

         if(existeTelefono != null){
            Error.push("El numero de telefono ya existe");
         }


         if(existeCorreo != null){
            Error.push("la dirrecion de correo ya existe")
         }

         if(existeNombreUsuario != null){
            Error.push("El nombre de usuario ya existe")
         }
         res.status(400).json(Error)
      }else{
         try {
            const path =req.file?.path
            const ContraseñaEncriptada=CryptoJS.AES.encrypt(JSON.stringify(clave),palabraSecreta).toString();

            const objetoaCrear={
               nombre:nombre,
               apellido:apellido,
               nro_Documento:nro_Documento,
               direccion:direccion,
               nroDireccion:nroDireccion,
               telefono:telefono,
               email:email,
               nombreUsuario:nombreUsuario,
               clave:ContraseñaEncriptada,
               palabraSecreta:palabraSecreta,
               documentoId:documentoId,
               roleId:roleId
            }
            // const {nombre,apellido,nro_Documento,direccion,nroDireccion,telefono,email,nombreUsuario,clave,documentoId,roleId}
            const DatoAlta= await AltaBdEmpleado(objetoaCrear,Empleado,path)
            if(DatoAlta){
               recibirEmail(email)
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

     if(!palabraSecreta){
        Error.push("Ingrese una palabra secreta")
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

   const {nro_Documento,email}=req.query
   let DatosFiltrar;
   if(nro_Documento){
      
      DatosFiltrar= await FiltrarEmpleado(Empleado,Documentos,Rol,"nro_Documento",nro_Documento)
   }else{

      if(email){
        DatosFiltrar = await FiltrarEmpleado(Empleado,Documentos,Rol,"email",email)
      }else{
        DatosFiltrar = await FiltrarEmpleado(Empleado,Documentos,Rol)
      }
   }
   res.status(200).json(DatosFiltrar)
}

const LoginBusqueda = async (req,res)=>{

   const {email,pass}=req.query
   let DatosFiltrar;
   if(email && pass ){
      DatosFiltrar = await comprobarEmpleado(Empleado,email,pass);
      res.status(200).json(DatosFiltrar)

   }else{
      
      res.status(400).json({error:"Complete el o los campos faltante"})

   }
   
}






const Editar = async (req,res)=>{
    const id = req.body
    const {path}= req.file
   
    if(id){
      const DatoActualizado = await UpdateBdEmpleado(Empleado,req.body,path)
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
     const DatoActualizado = await ActivarBdcuenta(email,Empleado)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La cuenta del empleado se a activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la cuenta del empleado ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una correo'})
   }
}

const Activar = async (req,res)=>{
   const {id} = req.params
   console.log(id)
   if(id){
     const DatoActualizado = await ActivarBd(id,Empleado)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La cuenta del empleado se a activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la cuenta del empleado ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.params
   if(id){
      const DatoActualizado = await DesactivarBd(id,Empleado)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La cuenta del empleado fue desactivada con exito'})
      }else{
         res.status(400).json({mensaje:'Error al  desactivar la cuenta del empleado ya se encuentra desactivada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}
module.exports={Crear ,Filtrar,Editar,Activar,Desactivar,ActivarUsu,LoginBusqueda}