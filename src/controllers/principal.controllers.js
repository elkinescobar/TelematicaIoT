const principalCtrl = {};
const Datos = require("../models/datos");
global.siT = null;
global.siH = null;
principalCtrl.postValorIoT = async (req, res) => {
  var DatosSensor = req.body;
  console.log(DatosSensor);
  var humedad = DatosSensor.humedad;
  var temperatura = DatosSensor.temperatura;
  console.log(humedad);
  console.log(temperatura);
  
  if (DatosSensor) {
    respuesta = {
      error : false,
      codigo : 200,
      mensaje : "Dato recibido"
    }
    res.send (respuesta);
  }
   else {
    respuesta = {
      error : true,
      codigo : 501,
      mensaje : "Error"
    }
    res.send (respuesta);
  }

  const newDatos = new Datos ({
    humedad,
    temperatura,
  });

  await newDatos.save();
};

principalCtrl.mostrardatos = async (req, res) => {
  try {
    const ultimoDato = await Datos.findOne().sort({ _id: -1 }).lean();
    global.siT = 0;
    global.siH = 0;
    const temperaturamax = 30;
    const humedadmax = 70;
    if (ultimoDato.temperatura > temperaturamax){
      global.siT = 1;
    }
    if (ultimoDato.humedad > humedadmax){
      global.siH = 1;
    }
    const sit = global.siT;
    const sih = global.siH;
    console.log(ultimoDato);
    res.render("index", { ultimoDato, sit, sih});
  } catch (error) {
    // Manejar el error, por ejemplo, enviar una respuesta de error al cliente
    console.error(error);
    res.status(500).send("Error al obtener el último dato.");
  }
};

module.exports = principalCtrl;