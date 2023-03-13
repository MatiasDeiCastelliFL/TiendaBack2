
const { Marcas } = require("../Models/Marca");
const { SubCategorias } = require("../Models/SubCategoria");
const { Talles } = require("../Models/Talle");
const { Fotos } = require("../Models/Foto");
const { Articulos } = require("../Models/Articulo");
const { where, Op } = require("sequelize");
const { Ventas } = require("../Models/Ventas");
const { Detalle_Venta } = require("../Models/Detalle_Venta");
const { Clientes } = require("../Models/Cliente");
const { Empleado } = require("../Models/Empleado");

const AltaVenta = async (DatoVenta, empleadoId, clienteId,codigoVenta) => {
  let suma = 0;

  for (let index = 0; index < DatoVenta.length; index++) {
    suma = suma + DatoVenta[index].cantidad * DatoVenta[index].precio;
  }
  const VentaCreado = await Ventas.create({
    total: suma,
    activo: true,
    codigoVenta:codigoVenta,
    empleadoId: empleadoId,
    clienteId:clienteId,
  });

  for (let index2 = 0; index2 < DatoVenta.length; index2++) {
    await Detalle_Venta.create({ 
      cantidad: DatoVenta[index2].cantidad,
      precio: DatoVenta[index2].precio,
      ventaId: VentaCreado.id,
      articuloId: DatoVenta[index2].articuloId,
      clienteId:clienteId,
      impuestoId: 1,
    });
  }

  return "Venta generado correctamente";
};

const Anular = async (id) => {
  const BuscarRegistro = await Ventas.findOne({ where: { id: id } });
  console.log(BuscarRegistro);
  if (BuscarRegistro.activo) {
    await Ventas.update(
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

const FiltrarVentas = async (VentaId) => {
  let detalles_ventaInfo;
  if (VentaId) {
    detalles_ventaInfo = await Ventas.findAll({
      include:[
        {model:Clientes,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
        {model:Empleado,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
        {model: Articulos,attributes: ["codigo","descripcion","sexo","marcaId","subCategoriaId"],include: [
            { model: Marcas, attributes: ["name", "descripcion", "activo"] },
            { model: SubCategorias, attributes: ["name", "activo"] },
            { model: Talles, attributes: ["name"] },
            { model: Fotos, attributes: ["imagen", "stock"] },
        ],
        trough: {
            attributes: [
              "cantidad",
              "precio",
              "ventaId",
              "clienteId",
              "articuloId",
              "impuestoId",
            ],
          },
        },
        
    ],
      where: {
        Id: { [Op.eq]: VentaId },
      },
    });
  }else{
    detalles_ventaInfo = await Ventas.findAll({
        include:[
          {model:Clientes,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
          {model:Empleado,attributes:["nombre","apellido","nro_Documento","direccion","nroDireccion","telefono","email"]},
          {model: Articulos,attributes: ["codigo","descripcion","sexo","marcaId","subCategoriaId"],include: [
              { model: Marcas, attributes: ["name", "descripcion", "activo"] },
              { model: SubCategorias, attributes: ["name", "activo"] },
              { model: Talles, attributes: ["name"] },
              { model: Fotos, attributes: ["imagen", "stock"] },
          ],
          trough: {
              attributes: [
                "cantidad",
                "precio",
                "ventaId",
                "clienteId",
                "articuloId",
                "impuestoId",
              ],
            },
          },
          
      ]});
  }

  return detalles_ventaInfo;
};

module.exports = {AltaVenta,Anular,FiltrarVentas};
