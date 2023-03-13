const { AltaDetalle,Anular, FiltrarIngreso } = require("../Services/DatosIngreso");

const AltaIngreso= async (req,res)=>{
   let Mensaje=[];
    const {DatoArticulos,empleadoId,proveedoreId} = req.body

 
    if(DatoArticulos.length>0 && empleadoId && proveedoreId){

        const IngresoGenerado=await AltaDetalle(DatoArticulos,empleadoId,proveedoreId);    
        Mensaje=IngresoGenerado
        
        res.status(200).json(Mensaje)
    }else{
        if(DatoArticulos.length ===0){

            Mensaje.push("Complete los campos")
        }
        if(!empleadoId){
            Mensaje.push("Seleccione el empleado")
        }
        if(!proveedoreId){
            Mensaje.push("Seleccione un proveedor")
        }

        res.status(200).json(Mensaje)
    }
}
const AnularIngresos=async(req,res)=>{
    let mensaje="";
    try {
        const {id}= req.query
        if(id){
            mensaje= await Anular(id);
            if(mensaje == true){
                res.status(200).json({mensaje:"Ingreso anulado correctamente"})
            }else{
                res.status(400).json({mensaje:"El Ingreso ya se encuentra anulado"})
            }
            
        }else{
            res.status(400).json({mensaje:"Seleccione un ingreso anular"})
        }


    } catch (error) {
        res.status(400).json({mensaje:error})
    }

}


const Filtrare = async(req,res)=>{
    const {ingresoId}= req.query
    const FiltrarArticulos= await FiltrarIngreso(ingresoId)
    res.status(200).json(FiltrarArticulos)
 }

module.exports={AltaIngreso,AnularIngresos,Filtrare};

