
const path = require("path");
const { recibirEmailCliente } = require("../middleware/enviarCorreo");
const { Clientes } = require("../Models/Cliente");
const { Documentos } = require("../Models/Documento");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
const { where, Op, not } = require("sequelize");
const { AltaBdCliente,FiltrarBD,UpdateBdCliente,ActivarBd,DesactivarBd,ActivarBdcuenta,FiltrarBDId,BuscarNameUsuario,BuscarEmailUsuario,
   BuscarTelefonoUsuario,AltaBdClienteAutenticacion,
   BuscarDocumentoUsuario,UpdateBdClienteSinImg,DeleteBd,comprobarCliente,BuscarNameUsuarioAutenticado,BuscarEmailUsuarioAutenticado,BuscarTelefonoUsuarioAutenticado,BuscarDocumentoUsuarioAutenticado} = require("../Services/DatoBd");
const { Empleado } = require("../Models/Empleado");

const Crear= async (req,res) =>{

   const {nombre,apellido,nro_Documento,telefono,email,nombreUsuario,clave,palabraSecreta,documentoId}=req.body

   
   const Error = [];
  

   if(nombre  && apellido  && nro_Documento && telefono  && email  && nombreUsuario  && clave  && palabraSecreta  && documentoId ){
      
      const existeDocumento= await Clientes.findOne({where:{
         
         [Op.and]: [
            {nro_Documento: nro_Documento},
            {activoAutenticador: false }
         ]
      }});

      let existeCorreo = await Clientes.findOne({where:{
         
         [Op.and]: [
            {  email:email},
            { activoAutenticador: false }
         ]
      }});


      if(existeCorreo==null){
         existeCorreo=await Empleado.findOne({where:{
           
                 email:email,
            
         }})
      }

      const existeTelefono= await Clientes.findOne({
        where:{
            [Op.and]: [
               { telefono:telefono},
               { activoAutenticador: false }
            ]
        }
      })

      const existeNombreUsuario= await Clientes.findOne({
         where:{
            [Op.and]: [
               { nombreUsuario:nombreUsuario },
               { activoAutenticador: false }
             ]
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
            Error.push("la direccion de correo ya existe")
         }

         if(existeNombreUsuario != null){
            Error.push("El nombre de usuario ya existe")
         }
         res.json({error:Error})
      }else{
         try {
          
            const path =req.file?.path
            const ContraseñaEncriptada=CryptoJS.AES.encrypt(JSON.stringify(clave),palabraSecreta).toString();
      

            const objetoaCrear={
               nombre:nombre,
               apellido:apellido,
               nro_Documento:nro_Documento,
               telefono:telefono,
               email:email,
               nombreUsuario:nombreUsuario,
               clave:ContraseñaEncriptada,
               palabraSecreta:palabraSecreta,
               documentoId:documentoId,
            }

            const DatoAlta= await AltaBdCliente(objetoaCrear, Clientes,path)
           
           
            recibirEmailCliente(email);
           
            if(DatoAlta){
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
      res.json({error:Error})
   }
  
}
const AuntenticateCreate= async (req,res) =>{

   const {nombre,apellido,nro_Documento,telefono,email,nombreUsuario,documentoId}=req.body
   console.log(documentoId)
   
   const Error = [];
  

   if(nombre  && apellido  && nro_Documento && telefono  && email  && nombreUsuario  &&  documentoId !== 0 ){
      
      const existeDocumento= await Clientes.findOne({where:{
         
         [Op.and]: [
            {nro_Documento: nro_Documento},
            {activoAutenticador: true }
         ]
      }});

      const existeCorreo = await Clientes.findOne({where:{
         
         [Op.and]: [
            {  email:email},
            { activoAutenticador: true }
         ]
      }});

      const existeTelefono= await Clientes.findOne({
        where:{
            [Op.and]: [
               { telefono:telefono},
               { activoAutenticador: true }
            ]
        }
      })

      const existeNombreUsuario= await Clientes.findOne({
         where:{
            [Op.and]: [
               { nombreUsuario:nombreUsuario },
               { activoAutenticador: true }
             ]
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
            Error.push("la direccion de correo ya existe")
         }
         if(existeNombreUsuario != null){
            Error.push("El nombre de usuario ya existe")
         }
         res.json({error:Error})
      }else{
         try {
            const DatoAlta= await AltaBdClienteAutenticacion(req.body, Clientes)
            if(DatoAlta){
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

   
    if(!telefono){
       Error.push("Complete el campo de numero de telefono")
    }

    if(!email){
       Error.push("Complete el campo de email")
    }
    if(!nombreUsuario){
        
        Error.push("Complete el campo de nombre de usuario")
     }

   
     if(documentoId ==0){
        Error.push("Complete el campo de tipo de documento")
     }
      res.json({error:Error})
   }
  
}

const Filtrar = async (req,res)=>{

   const {nro_Documento,email,id}=req.query
   console.log(req.query)
   let DatosFiltrar;

   if(nro_Documento){
      console.log("llegue documento")
      DatosFiltrar= await FiltrarBD(Clientes,Documentos,"nro_Documento",nro_Documento)
   }else{

      if(email){
        
        DatosFiltrar = await FiltrarBD(Clientes,Documentos,"email",email)
      }else{
         console.log("llegue id")
         if(id){
            DatosFiltrar = await FiltrarBD(Clientes,Documentos,"id",id)
         }
        DatosFiltrar = await FiltrarBD(Clientes,Documentos)
      }
   }
   res.status(200).json(DatosFiltrar)
}

const FiltrarCliente = async (req, res)=>{
   console.log("llegue")
   let datosFiltrar 

   let {id}= req.query
   console.log(id)
   if(id){
      datosFiltrar = await FiltrarBDId(Clientes,Documentos,id)

      res.status(200).json(datosFiltrar)
   }

   return datosFiltrar
}

const Editar = async (req,res)=>{

   const {nombre,apellido,documentoId,nro_Documento,nombreUsuario,email,telefono,nroDocumentoAnt,emailAnt,telefonoAnt,nombreUsuarioAnt}=req.body
   
   const {id}= req.query

   const path =req.file?.path
   const Error=[];
   
   if(path){
      if(nombre && apellido && documentoId && nro_Documento && nombreUsuario && email && telefono && nroDocumentoAnt && emailAnt && telefonoAnt && nombreUsuarioAnt){
         
         
         if(nombreUsuario === nombreUsuarioAnt && email === emailAnt && telefono === telefonoAnt && nro_Documento === nroDocumentoAnt ){
            let DatoActualizado = await UpdateBdCliente(Clientes,req.body,path,id)

            res.status(200).json("Actualizado Correctamente")
         }else{
            
            if(nombreUsuario !== nombreUsuarioAnt){
              let buscarNombreUsuario= await BuscarNameUsuario(Clientes,nombreUsuario);
               if(buscarNombreUsuario){
                  Error.push("El nombre de usuario ya existe");
               }
            }

            if(email !== emailAnt){
               let buscarEmailUsuario= await BuscarEmailUsuario(Clientes,email);
               if(buscarEmailUsuario){
                  Error.push("la direccion de correo ya existe");
               }
            }

            if(telefono !== telefonoAnt){
               let buscarTelefonoUsuario= await BuscarTelefonoUsuario(Clientes,telefono);

               console.log(buscarTelefonoUsuario)
               if(buscarTelefonoUsuario){
                  Error.push("El numero de telefono ya existe");
               }
            }

            if(nro_Documento !== nroDocumentoAnt){
               let buscardocUsuario= await BuscarDocumentoUsuario(Clientes,nro_Documento);
               console.log(buscardocUsuario)
               if(buscardocUsuario){
                  Error.push("El numero de documento ya existe");
               }
            }

            if(Error.length === 0){
               await UpdateBdCliente(Clientes,req.body,path,id)
               res.status(200).json("Actualizado Correctamente")
            }else{
               res.json({error:Error})
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
         res.json({error:Error})
      }
   }else{
      if(nombre && apellido && documentoId && nro_Documento && nombreUsuario && email && telefono &&  nroDocumentoAnt && emailAnt && telefonoAnt && nombreUsuarioAnt){
         
         
         if(nombreUsuario === nombreUsuarioAnt && email === emailAnt && telefono === telefonoAnt && nro_Documento === nroDocumentoAnt ){
            let DatoActualizado = await UpdateBdClienteSinImg(Clientes,req.body,id)

            res.status(200).json("Actualizado Correctamente")
         }else{
            
            if(nombreUsuario !== nombreUsuarioAnt){
              let buscarNombreUsuario= await BuscarNameUsuario(Clientes,nombreUsuario);
               if(buscarNombreUsuario){
                  Error.push("El nombre de usuario ya existe");
               }
            }

            if(email !== emailAnt){
               let buscarEmailUsuario= await BuscarEmailUsuario(Clientes,email);
               if(buscarEmailUsuario){
                  Error.push("la direccion de correo ya existe");
               }
            }

            if(telefono !== telefonoAnt){
               let buscarTelefonoUsuario= await BuscarTelefonoUsuario(Clientes,telefono);

               console.log(buscarTelefonoUsuario)
               if(buscarTelefonoUsuario){
                  Error.push("El numero de telefono ya existe");
               }
            }

            if(nro_Documento !== nroDocumentoAnt){
               let buscardocUsuario= await BuscarDocumentoUsuario(Clientes,nro_Documento);
               console.log(buscardocUsuario)
               if(buscardocUsuario){
                  Error.push("El numero de documento ya existe");
               }
            }

            if(Error.length === 0){
               await UpdateBdClienteSinImg(Clientes,req.body,id)
               res.status(200).json("Actualizado Correctamente")
            }else{
               res.json({error:Error})
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
         res.json({error:Error})
      }
   }
}

const EditarAuntenticacion = async (req,res)=>{

   const {nombre,apellido,documentoId,nro_Documento,nombreUsuario,email,telefono,nroDocumentoAnt,emailAnt,telefonoAnt,nombreUsuarioAnt}=req.body
   
   const {id}= req.query

   const path =req.file?.path
   const Error=[];
   
   if(path){
      if(nombre && apellido && documentoId && nro_Documento && nombreUsuario && email && telefono && nroDocumentoAnt && emailAnt && telefonoAnt && nombreUsuarioAnt){
         
         
         if(nombreUsuario === nombreUsuarioAnt && email === emailAnt && telefono === telefonoAnt && nro_Documento === nroDocumentoAnt ){
            let DatoActualizado = await UpdateBdCliente(Clientes,req.body,path,id)

            res.status(200).json("Actualizado Correctamente")
         }else{
            
            if(nombreUsuario !== nombreUsuarioAnt){
              let buscarNombreUsuario= await BuscarNameUsuarioAutenticado(Clientes,nombreUsuario);
               if(buscarNombreUsuario){
                  Error.push("El nombre de usuario ya existe");
               }
            }

            if(email !== emailAnt){
               let buscarEmailUsuario= await BuscarEmailUsuarioAutenticado(Clientes,email);
               if(buscarEmailUsuario){
                  Error.push("la direccion de correo ya existe");
               }
            }

            if(telefono !== telefonoAnt){
               let buscarTelefonoUsuario= await BuscarTelefonoUsuarioAutenticado(Clientes,telefono);

               console.log(buscarTelefonoUsuario)
               if(buscarTelefonoUsuario){
                  Error.push("El numero de telefono ya existe");
               }
            }

            if(nro_Documento !== nroDocumentoAnt){
               let buscardocUsuario= await BuscarDocumentoUsuarioAutenticado(Clientes,nro_Documento);
               console.log(buscardocUsuario)
               if(buscardocUsuario){
                  Error.push("El numero de documento ya existe");
               }
            }

            if(Error.length === 0){
               await UpdateBdCliente(Clientes,req.body,path,id)
               res.status(200).json("Actualizado Correctamente")
            }else{
               res.json({error:Error})
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
       
       if(!telefono){
          Error.push("Complete el campo de numero de telefono")
       }
   
       if(!email){
          Error.push("Complete el campo de email")
       }
       if(!nombreUsuario){
           
           Error.push("Complete el campo de nombre de usuario")
        }
   
        if(!documentoId){
           Error.push("Complete el campo de tipo de documento")
        }
         res.json({error:Error})
      }
   }else{
      if(nombre && apellido && documentoId && nro_Documento && nombreUsuario && email && telefono &&  nroDocumentoAnt && emailAnt && telefonoAnt && nombreUsuarioAnt){
         
         
         if(nombreUsuario === nombreUsuarioAnt && email === emailAnt && telefono === telefonoAnt && nro_Documento === nroDocumentoAnt ){
            let DatoActualizado = await UpdateBdClienteSinImg(Clientes,req.body,id)

            res.status(200).json("Actualizado Correctamente")
         }else{
            
            if(nombreUsuario !== nombreUsuarioAnt){
              let buscarNombreUsuario= await BuscarNameUsuarioAutenticado(Clientes,nombreUsuario);
               if(buscarNombreUsuario){
                  Error.push("El nombre de usuario ya existe");
               }
            }

            if(email !== emailAnt){
               let buscarEmailUsuario= await BuscarEmailUsuarioAutenticado(Clientes,email);
               if(buscarEmailUsuario){
                  Error.push("la direccion de correo ya existe");
               }
            }

            if(telefono !== telefonoAnt){
               let buscarTelefonoUsuario= await BuscarTelefonoUsuarioAutenticado(Clientes,telefono);

               console.log(buscarTelefonoUsuario)
               if(buscarTelefonoUsuario){
                  Error.push("El numero de telefono ya existe");
               }
            }

            if(nro_Documento !== nroDocumentoAnt){
               let buscardocUsuario= await BuscarDocumentoUsuarioAutenticado(Clientes,nro_Documento);
               console.log(buscardocUsuario)
               if(buscardocUsuario){
                  Error.push("El numero de documento ya existe");
               }
            }

            if(Error.length === 0){
               await UpdateBdClienteSinImg(Clientes,req.body,id)
               res.status(200).json("Actualizado Correctamente")
            }else{
               res.json({error:Error})
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
         res.json({error:Error})
      }
   }
}


const EliminarCliente = async(req,res)=>{
   
   const {id}= req.query

   if(id){
      const DatoEliminado = await DeleteBd(id,Clientes)
      if(DatoEliminado){
         res.status(200).json({mensaje:'La cuenta se elimino Correctamente'})
      }else{
         res.status(400).json({mensaje:'No se encontro el cliente a eliminar'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }
}

const Activar = async (req,res)=>{
   const {id} = req.query
   if(id){
     const DatoActualizado = await ActivarBd(id,Clientes)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La cuenta se activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la cuenta ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una id'})
   }
}

const ActivarUsu = async (req,res)=>{
   const {email} = req.query
   if(email){
    
     const DatoActualizado = await ActivarBdcuenta(email,Clientes)
     if(DatoActualizado){
        res.status(200).json({mensaje:'La cuenta del empleado se a activado con exito'})
     }else{
        res.status(400).json({mensaje:'Error la cuenta del empleado ya se encuentra activada'})
     }
   }else{
      res.status(400).json({mensaje:'Ingrese una correo'})
   }
}


const filtrarClienteAuntenticacion= async(req,res)=>{
   
   const {email}= req.query

   const EmailEncontrado= await BuscarEmailUsuarioAutenticado(Clientes,email)

   if(EmailEncontrado){
      res.json({Ingresar:true})
   }else{
      res.json({Ingresar:false})
   }
}

const Desactivar = async (req,res)=>{
   const {id} = req.query
   if(id){
      const DatoActualizado = await DesactivarBd(id,Clientes)
      if(DatoActualizado){
         res.status(200).json({mensaje:'La cuenta fue desactivada con exito'})
      }else{
         res.status(400).json({mensaje:'Error la cuenta se encuentra desactivada'})
      }
    }else{
       res.status(400).json({mensaje:'Ingrese una id'})
    }

}


const LoginBusquedaCliente = async (req,res)=>{

   const {email,pass}=req.query
   let DatosFiltrar;
   console.log("llegue")
   if(email && pass ){
      DatosFiltrar = await comprobarCliente(Clientes,email,pass);
      res.status(200).json(DatosFiltrar)

   }else{
      
      res.status(400).json({error:"Complete el o los campos faltante"})

   }
   
}

// const Desactivar = async (req,res)=>{
//    const {id} = req.query
//    if(id){
//       const DatoActualizado = await DesactivarBd(id,Clientes)
//       if(DatoActualizado){
//          res.status(200).json({mensaje:'La cuenta fue desactivada con exito'})
//       }else{
//          res.status(400).json({mensaje:'Error la cuenta se encuentra desactivada'})
//       }
//     }else{
//        res.status(400).json({mensaje:'Ingrese una id'})
//     }

// }


module.exports={Crear ,Filtrar,Editar,Activar,Desactivar,ActivarUsu,LoginBusquedaCliente ,FiltrarCliente,EliminarCliente,AuntenticateCreate,EditarAuntenticacion,filtrarClienteAuntenticacion}