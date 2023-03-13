const path = require("path");
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

const { where, Op, not } = require("sequelize");
const { Talles } = require("../Models/Talle");
const cloudinary = require("../utils/cloudinary");
const { Articulos } = require("../Models/Articulo");

//funcion para crear registro en modelos
const AltaBd = async (body, modelo) => {
  const DatoAcrear = await modelo.create(body);
  return DatoAcrear;
};

const AltaArticulo = async (body, modelo) => {
  // codigo && descripcion && sexo && subCategoriaId && marcaId,talleId

  const objeto = {
    codigo: body.codigo,
    descripcion: body.descripcion,
    sexo: body.sexo,
    precio: body.precio,
    subCategoriaId: body.subCategoriaId,
    marcaId: body.marcaId,
  };

  const DatoAcrear = await modelo.create(objeto);

  await DatoAcrear.addTalles(body.talleId);
  return DatoAcrear;
};

const AltaBdFoto = async (body, modelo, path) => {
  const ImagenSubida = await cloudinary.v2.uploader.upload(path);

  const { url } = ImagenSubida;

  const objecto = {
    imagen: url,
    stock: body.stock,
    articuloId: body.articuloId,
  };

  const DatoAcrear = await modelo.create(objecto);
  await Articulos.update(
    { activo: true },
    {
      where: {
        id: body.articuloId,
      },
    }
  );
  return DatoAcrear;
};

const AltaBdCliente = async (body, modelo, path) => {
  if (path) {
    const ImagenSubida = await cloudinary.v2.uploader.upload(path);
    const { url } = ImagenSubida;
    const objecto = {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      telefono: body.telefono,
      email: body.email,
      nombreUsuario: body.nombreUsuario,
      imagen: url,
      clave: body.clave,
      palabraSecreta: body.palabraSecreta,
      documentoId: body.documentoId,
    };
    const DatoAcrear = await modelo.create(objecto);

    return DatoAcrear;
  } else {
    const objecto = {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      direccion: body.direccion,
      nroDireccion: body.nroDireccion,
      telefono: body.telefono,
      email: body.email,
      nombreUsuario: body.nombreUsuario,
      imagen:
        "https://fundacionkyrios.org/wp-content/uploads/2021/06/foto-sin-rostro.jpg",
      clave: body.clave,
      palabraSecreta: body.palabraSecreta,
      documentoId: body.documentoId,
    };


    const DatoAcrear = await modelo.create(objecto);

    return DatoAcrear;
  }
};


const AltaBdClienteAutenticacion = async (body, modelo) => {

  const ImagenSubida = await cloudinary.v2.uploader.upload(body.imagen);
    const { url } = ImagenSubida;
    const DatoAcrear = await modelo.create({
      nombre:body.nombre,
      apellido:body.apellido,
      nro_Documento:body.nro_Documento,
      telefono:body.telefono,
      email:body.email,
      nombreUsuario:body.nombreUsuario,
      imagen:url,
      activo:true,
      activoAutenticador:true,
      documentoId:body.documentoId
    });

    return DatoAcrear;
}




const AltaBdEmpleado = async (body, modelo, path) => {
  if (path) {
    const ImagenSubida = await cloudinary.v2.uploader.upload(path);
    const { url } = ImagenSubida;

    const objecto = {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      direccion: body.direccion,
      nroDireccion: body.nroDireccion,
      telefono: body.telefono,
      email: body.email,
      nombreUsuario: body.nombreUsuario,
      clave: body.clave,
      palabraSecreta: body.palabraSecreta,
      imagen: url,
      activo: false,
      documentoId: body.documentoId,
      roleId: body.roleId,
    };
    const DatoAcrear = await modelo.create(objecto);

    return DatoAcrear;
  } else {
    const objecto = {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      direccion: body.direccion,
      nroDireccion: body.nroDireccion,
      telefono: body.email,
      email: body.email,
      imagen:
        "https://fundacionkyrios.org/wp-content/uploads/2021/06/foto-sin-rostro.jpg",
      nombreUsuario: body.nombreUsuario,
      clave: body.clave,
      activo: false,
      documentoId: body.documentoId,
      roleId: body.roleId,
    };

    const DatoAcrear = await modelo.create(objecto);
    return objecto;
  }
};

const AltaBdProveedor = async (body, modelo, path) => {
  if (path) {
    const ImagenSubida = await cloudinary.v2.uploader.upload(path);
    const { url } = ImagenSubida;

    const objecto = {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      direccion: body.direccion,
      nroDireccion: body.nroDireccion,
      telefono: body.telefono,
      email: body.email,
      imagen: url,
      activo: false,
      documentoId: body.documentoId,
    };
    const DatoAcrear = await modelo.create(objecto);

    return DatoAcrear;
  } else {
    const objecto = {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      direccion: body.direccion,
      nroDireccion: body.nroDireccion,
      telefono: body.email,
      email: body.email,
      imagen:
        "https://fundacionkyrios.org/wp-content/uploads/2021/06/foto-sin-rostro.jpg",
      activo: false,
      documentoId: body.documentoId,
    };

    const DatoAcrear = await modelo.create(objecto);
    return objecto;
  }
};

//Funcion eliminar fila de modelo
const DeleteBd = async (id, modelo) => {
  const FilaEliminar = modelo.destroy({ where: { id: id } });
  return (FilaEliminar) ? true : false;
};
//Funcion borrado logico

const ActivarBdcuenta = async (email, modelo) => {
  const elemento = await modelo.findOne({
    where: {
      email,
    },
  });

  if(elemento){
    const dataValues = elemento?.dataValues;
    if (dataValues.activo === false) {
      await modelo.update(
        { activo: true },
        {
          where: {
            email: email,
          },
        }
      );
      return true;
    } else {
      return false;
    }
  }else{
    return false
  }
  
};

const ActivarBd = async (id, modelo) => {
  const elemento = await modelo.findOne({
    where: {
      id: id,
    },
  });


  const dataValues = elemento?.dataValues;
  if (dataValues?.activo === false) {
    await modelo.update(
      { activo: true },
      {
        where: {
          id: id,
        },
      }
    );
    return true;
  } else {
    return false;
  }
};

const DesactivarBd = async (id, modelo) => {
  const elemento = await modelo.findOne({
    where: {
      id: id,
    },
  });

  const dataValues = elemento?.dataValues;
  if (dataValues.activo === true) {
    await modelo.update(
      { activo: false },
      {
        where: {
          id: id,
        },
      }
    );
    return true;
  } else {
    return false;
  }
};
//Actualizacion por modelo
const UpdateBdCategoria = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      name: body.name,
      descripcion: body.descripcion,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};

const UpdateBdRol = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      name: body.name,
      descripcion: body.descripcion,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};

const UpdateBdCliente = async (modelo, body, path,id) => {

  console.log("llegue")
  console.log(id)

  const ImagenSubida = await cloudinary.v2.uploader.upload(path);
  const { url } = ImagenSubida;


  const datoActualizar = await modelo.update(
    {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      telefono: body.telefono,
      email: body.email,
      nombreUsuario: body.nombreUsuario,
      imagen: url,
      clave: body.clave,
      documentoId: body.documentoId,
    },
    {
      where: {
        id:id
      },
    }
  );



  return datoActualizar ? true : false;
};



const UpdateBdClienteSinImg = async (modelo, body,id) => {

  const datoActualizar = await modelo.update(
    {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      telefono: body.telefono,
      email: body.email,
      nombreUsuario: body.nombreUsuario,
      clave: body.clave,
      documentoId: body.documentoId,
    },
    {
      where: {
        id:id
      },
    }
  );



  return datoActualizar ? true : false;
};


const UpdateBdEmpleado = async (modelo, body, path,id) => {
  const ImagenSubida = await cloudinary.v2.uploader.upload(path);
  const { url } = ImagenSubida;

  const datoActualizar = await modelo.update(
    {
      nombre: body.nombre,
      apellido: body.apellido,
      nro_Documento: body.nro_Documento,
      direccion: body.direccion,
      telefono: body.telefono,
      email: body.email,
      nombreUsuario: body.nombreUsuario,
      imagen: url,
      clave: body.clave,
      documentoId: body.documentoId,
      roleId: body.roleId,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};

const UpdateBdSubcategoria = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      name: body.name,
      activo: body.activo,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};
const UpdateBdMarca = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      name: body.name,
      descripcion: body.descripcion,
      activo: body.activo,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};

const UpdateBdImpuesto = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      impuestoTotalIva: body.impuestoTotalIva,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};

const UpdateBdTipo = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      name: body.name,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};
const UpdateBdTalle = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      name: body.name,
      descripcion: body.descripcion,
      activo: body.activo,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};
const UpdateBdArticulo = async (modelo, body) => {
  const datoActualizar = await modelo.update(
    {
      codigo: body.codigo,
      descripcion: body.descripcion,
      sexo: body.sexo,
      precio: body.sexo,
      subCategoriaId: body.subCategoriaId,
      marcaId: body.marcaId,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};

const UpdateBdFotos = async (modelo, body, path) => {
  const ImagenSubida = await cloudinary.v2.uploader.upload(path);
  const { url } = ImagenSubida;

  const datoActualizar = await modelo.update(
    {
      imagen: url,
      stock: body.stock,
      articuloId: body.articuloId,
    },
    {
      where: {
        id: body.id,
      },
    }
  );

  return datoActualizar ? true : false;
};
//fin de actualizacion
const FiltrarBD = async (modelo, configuracion, propiedad, id) => {
  console.log(propiedad)
  if (Object.entries(configuracion).length > 0) {
    if (id) {
      return await modelo.findOne({
        include: configuracion,
        where: { [propiedad]: id },
      });
    } else {
      return await modelo.findAll({ include: configuracion });
    }
  } else {
    if (id) {
      return await modelo.findAll({ where: { [propiedad]: id } });
    } else {
      return await modelo.findAll();
    }
  }
};

const FiltrarBDId = async (modelo, configuracion, id) => {
    console.log(id)
    if (id) {
      return await modelo.findOne({
        include: {model:configuracion,attributes:["nombre"]},
        where: { id: id },
      });
    } 
  
};

const ArticuloFoto = async (modelo, id) => {
  const PoseeFoto = await modelo.findAll({ where: { articuloId: id } });

  return PoseeFoto;
};

const FiltrarArticulo = async (
  ModeloArticulo,
  ModeloTalle,
  ModeloMarca,
  ModeloSubCategoria,
  ModeloFoto,
  codigo,
 
) => {
  let articulo = {};

  
  if (codigo) {
      articulo = await ModeloArticulo.findAll({
          include: [
              { model: ModeloMarca, attributes: ["name", "descripcion", "activo"] },
              { model: ModeloSubCategoria, attributes: ["name", "activo"] },
              { model: ModeloTalle, attributes: ["name"] },
              { model: ModeloFoto, attributes: ["imagen", "stock"] },
          ],
          where: {
              codigo: { [Op.eq]: codigo },
          }
      });
  }else{
        articulo = await ModeloFoto.findAll({
            include: [
              {
                model: ModeloArticulo,
                attributes: [
                  "codigo",
                  "descripcion",
                  "sexo",
                  "precio",
                  "activo",
                  "subCategoriaId",
                  "marcaId",
                ],
                include: [
                  {model: ModeloMarca,attributes: ["name", "descripcion", "activo"],where: {activo: {[Op.is]: true,}}},
                  {model: ModeloSubCategoria, attributes: ["name", "activo"] ,where:{activo:{[Op.is]:true}}},
                  {model: ModeloTalle, attributes: ["name"],where:{activo:{[Op.is]:true}}},
                ],
                where: {
                  activo: {
                    [Op.is]: true,
                  },
                },
              },
            ],
            where: {
              stock: {
                [Op.gt]: 0,
              },
            },
          });
    }
    
    return articulo;
}

const comprobarEmpleado = async (ModeloEmpleado, email, pass) => {
  let empleado = await ModeloEmpleado.findOne({
    attributes: ["email", "clave", "palabraSecreta"],
    where: {
      email: { [Op.eq]: email },
    },
  });

  

  
  if (empleado) {
    const passEmple = empleado?.dataValues?.clave;
    const palabraSecreta = empleado?.dataValues?.palabraSecreta;

    let PassEnBytes = CryptoJS.AES.decrypt(passEmple, palabraSecreta);
    
    let PassDescriptada = PassEnBytes.toString(CryptoJS.enc.Utf8);

    if (PassDescriptada.replace(/['"]+/g, "") === pass) {
      return "Ingresando";
    } else {
      return "La contraseña no coinciden";
    }
  } else {
    return "Email incorrect";
  }
};

const comprobarCliente = async (ModeloCliente, email, pass) => {
  let Cliente = await ModeloCliente.findOne({
    attributes: ["email", "clave", "palabraSecreta"],
    where: {
      email: { [Op.eq]: email },
    },
  });

  

  
  if (Cliente) {
    const passCliente = Cliente?.dataValues?.clave;
    
    const palabraSecreta = Cliente?.dataValues?.palabraSecreta;

    let PassEnBytes = CryptoJS.AES.decrypt(passCliente, palabraSecreta);
    
    let PassDescriptada = PassEnBytes.toString(CryptoJS.enc.Utf8);

    if (PassDescriptada.replace(/['"]+/g, "") === pass) {
      return "Ingresando";
    } else {
      return "La contraseña no coinciden";
    }
  } else {
    return "Email incorrect";
  }
};


const BuscarNameUsuarioAutenticado= async(Modelo,NombreUsuario)=>{

    let Name= await Modelo.findAll({where:{
      
      [Op.and]: [
        { nombreUsuario:NombreUsuario },
        { activoAutenticador: true }
      ]
    }})

    return (Name.length>0) ? true : false


}


const BuscarNameUsuario= async(Modelo,NombreUsuario)=>{

  let Name= await Modelo.findAll({where:{
    nombreUsuario:NombreUsuario
  }})

  return (Name.length>0) ? true : false


}
const BuscarEmailUsuario= async(Modelo,email)=>{

  let Correo= await Modelo.findAll({where:{
    email:{[Op.eq]:email}
  }})


  console.log(Correo)
  return (Correo.length>0) ? true : false


}


const BuscarTelefonoUsuario= async(Modelo,telefono)=>{

  let Tel= await Modelo.findAll({where:{
    telefono:telefono
  }})

  return (Tel.length>0) ? true : false


}

const BuscarDocumentoUsuario= async(Modelo,doc)=>{

  let Document= await Modelo.findAll({where:{
    nro_Documento:doc
  }})

  return (Document.length>0) ? true : false


}

const BuscarEmailUsuarioAutenticado= async(Modelo,email)=>{

  let Correo= await Modelo.findAll({where:{
   
 


    [Op.and]: [
      {  email:{[Op.eq]:email},
      activoAutenticador:{[Op.is]: true} },
    ]
  }})

  console.log(Correo)


  return Correo.length >0 ? true :false


}


const BuscarTelefonoUsuarioAutenticado= async(Modelo,telefono)=>{

  let Tel= await Modelo.findAll({where:{
    [Op.and]: [
      { telefono:telefono},
      { activoAutenticador: true }
    ]
    
  }})

  return (Tel.length>0) ? true : false


}

const BuscarDocumentoUsuarioAutenticado= async(Modelo,doc)=>{

  let Document= await Modelo.findAll({where:{
    [Op.and]: [
      { nro_Documento:doc },
      { activoAutenticador: true }
    ]
    
  }})

  return (Document.length>0) ? true : false


}



const FiltrarEmpleado = async (
  ModeloEmpleado,
  ModeloDocumento,
  ModeloRol,
  Propiedad1,
  Propiedad2
) => {
  let articulo;
  if (Propiedad1) {
    articulo = await ModeloEmpleado.findOne({
      include: [
        { model: ModeloDocumento, attributes: ["nombre"] },
        { model: ModeloRol, attributes: ["name"] },
      ],
      where: {
        [Propiedad1]: { [Op.eq]: Propiedad2 },
      },
    });
  } else {
    articulo = await ModeloEmpleado.findAll({
      include: [
        { model: ModeloDocumento, attributes: ["nombre"] },
        { model: ModeloRol, attributes: ["name"] },
      ],
    });
  }

  return articulo;
};

module.exports = {
  AltaBd,
  FiltrarBD,
  UpdateBdFotos,
  FiltrarArticulo,
  FiltrarEmpleado,
  comprobarEmpleado,
  DeleteBd,
  AltaBdEmpleado,
  BuscarNameUsuario,
  AltaBdCliente,
  AltaBdFoto,
  ArticuloFoto,
  AltaBdProveedor,
  UpdateBdEmpleado,
  UpdateBdCliente,
  UpdateBdRol,
  UpdateBdCategoria,
  UpdateBdSubcategoria,
  UpdateBdMarca,
  UpdateBdTalle,
  UpdateBdArticulo,
  UpdateBdTipo,
  ActivarBd,
  DesactivarBd,
  AltaArticulo,
  UpdateBdImpuesto,
  ActivarBdcuenta,
  FiltrarBDId,
  comprobarCliente,
  BuscarEmailUsuario,
  BuscarTelefonoUsuario,
  UpdateBdClienteSinImg,
  BuscarDocumentoUsuario,
  AltaBdClienteAutenticacion,BuscarNameUsuarioAutenticado,BuscarEmailUsuarioAutenticado,BuscarTelefonoUsuarioAutenticado,BuscarDocumentoUsuarioAutenticado
};
