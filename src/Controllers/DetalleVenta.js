const { AltaVenta,Anular,FiltrarVentas} = require("../Services/DatosVenta");

const AltaVentas= async (req,res)=>{
   let Mensaje=[];
    const {DatoArticulos,empleadoId,clienteId,codigoVenta,direccion,nroDireccion} = req.body

 
    if(DatoArticulos.length>0 && empleadoId && clienteId && codigoVenta){

        const VentaGenerado=await AltaVenta(DatoArticulos,empleadoId,clienteId,codigoVenta);    
        Mensaje=VentaGenerado
        
        res.status(200).json(Mensaje)
    }else{
        if(DatoArticulos.length ===0){

            Mensaje.push("Complete los campos")
        }
        if(!empleadoId){
            Mensaje.push("Seleccione el empleado")
        }
        if(!clienteId){
            Mensaje.push("Seleccione un cliente")
        }

        if(!codigoVenta){
            Mensaje.push("Ingrese el codigo de venta")
        }
       

        res.status(200).json(Mensaje)
    }
}
const AnularVenta=async(req,res)=>{
    let mensaje="";
    try {
        const {id}= req.query
        if(id){
            mensaje= await Anular(id);
            if(mensaje == true){
                res.status(200).json({mensaje:"Venta anulado correctamente"})
            }else{
                res.status(400).json({mensaje:"la Venta ya se encuentra anulado"})
            }
            
        }else{
            res.status(400).json({mensaje:"Seleccione una venta anular"})
        }


    } catch (error) {
        res.status(400).json({mensaje:error})
    }

}


const FiltrarVenta = async(req,res)=>{
    const {idVenta}= req.query
    const FiltrarArticulos= await FiltrarVentas(idVenta)
    res.status(200).json(FiltrarArticulos)
 }

module.exports={AltaVentas,AnularVenta,FiltrarVenta};

