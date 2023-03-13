const { Ingresos } = require("../Models/Ingresos");
const { Detalle_Ingreso } = require("../Models/Detalle_Ingreso");
const { Marcas } = require("../Models/Marca");
const { SubCategorias } = require("../Models/SubCategoria");
const { Talles } = require("../Models/Talle");
const { Fotos } = require("../Models/Foto");
const { Articulos } = require("../Models/Articulo");
const { where, Op } = require("sequelize");
const { Proveedore } = require("../Models/Proveedores");
const { Empleado } = require("../Models/Empleado");

const AltaDetalle = async (DatoIngreso, empleadoId, proveedoreId) => {



  let suma = 0;

  for (let index = 0; index < DatoIngreso.length; index++) {
    suma = suma + DatoIngreso[index].cantidad * DatoIngreso[index].precio;
  }

  console.log(suma)

  const IngresoCreado = await Ingresos.create({
    total: suma,
    activo: true,
    empleadoId: empleadoId,
    proveedoreId,
  });

  for (let index2 = 0; index2 < DatoIngreso.length; index2++) {
    await Detalle_Ingreso.create({
      cantidad: DatoIngreso[index2].cantidad,
      precio: DatoIngreso[index2].precio,
      ingresoId: IngresoCreado.id,
      articuloId: DatoIngreso[index2].articuloId,
      impuestoId: 1,
    });
  }

  return "Ingreso generado correctamente";
};

const Anular = async (id) => {
  const BuscarRegistro = await Ingresos.findOne({ where: { id: id } });
  console.log(BuscarRegistro);
  if (BuscarRegistro.activo) {
    await Ingresos.update(
      { activo: 0 },
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

const FiltrarIngreso = async (ingresoId) => {
  let articulo;
  let detalles_ingresosInfo;
  if (ingresoId) {
    detalles_ingresosInfo = Ingresos.findAll({
      include: [
        {model:Proveedore,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
        {model:Empleado,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
        {model: Articulos,attributes: ["codigo","descripcion","sexo","marcaId","subCategoriaId",],include: [{ model: Marcas, attributes: ["name", "descripcion", "activo"] },{ model: SubCategorias, attributes: ["name", "activo"] },{ model: Talles, attributes: ["name"] },{ model: Fotos, attributes: ["imagen", "stock"] },],
          trough: {
            attributes: [
              "cantidad",
              "precio",
              "ingresoId",
              "articuloId",
              "impuestoId",
            ],
          },
        },
      ],
      where: {
        Id: { [Op.eq]: ingresoId },
      },
    });

 
    return detalles_ingresosInfo;
  }else{
    detalles_ingresosInfo = Ingresos.findAll({
        include: [
          {model:Proveedore,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
          {model:Empleado,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
          {model: Articulos,attributes: ["codigo","descripcion","sexo","marcaId","subCategoriaId",],include: [{ model: Marcas, attributes: ["name", "descripcion", "activo"] },{ model: SubCategorias, attributes: ["name", "activo"] },{ model: Talles, attributes: ["name"] },{ model: Fotos, attributes: ["imagen", "stock"] },],
            trough: {
              attributes: [
                "cantidad",
                "precio",
                "ingresoId",
                "articuloId",
                "impuestoId",
              ],
            },
          },
        ],
      });
  
  }

  return detalles_ingresosInfo;
};

module.exports = { AltaDetalle, Anular, FiltrarIngreso };
