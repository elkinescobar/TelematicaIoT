const principalCtrl = {};
const Sensores = require("../models/sensor");

principalCtrl.registrarSensor = (req, res) => {
  res.render("registrar");
};

principalCtrl.listarSensores = async (req, res) => {
  const listadosensores = await Sensores.find();
  console.log(listadosensores);
  res.render("listado", { listadosensores });
};

principalCtrl.editarSensor = async (req, res) => {
  const sensor = await Sensores.findById(req.params.id);
  console.log(sensor);
  res.render("editarSensor", { sensor });
};

principalCtrl.actualizarSensor = async (req, res) => {
  const idSensor = req.body.id;
  console.log(idSensor);
  console.log(req.body.facultad);
  await Sensores.findByIdAndUpdate(
    idSensor,
    {
      nombre: req.body.nombre,
      ubicacion: req.body.ubicacion,
      tipo: req.body.tipo,
      latitud: req.body.latitud,
      longitud: req.body.longitud,
      valor: req.body.valor,
    },
    (error, idSensor) => {
      console.log(error, idSensor);
      res.redirect("/mostrarsensores");
    }
  );
};

/*principalCtrl.editarSensor = async (req, res) => {
  const sensor = await Sensores.findById(req.params.id);
  if (!sensor) {
    req.flash("error_msg", "Sensor no encontrado");
    return res.redirect("/mostrarsensores");
  }
  res.render("editarSensor", { sensor });
};

principalCtrl.actualizarSensor = async (req, res) => {
  const { nombre, ubicacion, tipo, latitud, longitud, valor } = req.body;
  try {
    const sensorActualizado = await Sensores.findByIdAndUpdate(
      req.params.id,
      { nombre, ubicacion, tipo, latitud, longitud, valor },
      { new: true }
    );
    if (!sensorActualizado) {
      req.flash("error_msg", "Sensor no encontrado");
      return res.redirect("/mostrarsensores");
    }
    req.flash("success_msg", "Sensor actualizado correctamente");
    res.redirect("/mostrarsensores");
  } catch (error) {
    console.error(error);
    req.flash("error_msg", "Error al actualizar el sensor");
    res.redirect("/mostrarsensores");
  }
};*/

principalCtrl.guardarSensor = async (req, res) => {
  const { nombre, ubicacion, tipo, latitud, longitud, valor } = req.body;
  const errors = [];
  if (!nombre) {
    errors.push({ text: "Por favor indique Nombre del sensor" });
  }
  if (!ubicacion) {
    errors.push({ text: "Por favor indique la ubicacion" });
  }
  if (!tipo) {
    errors.push({ text: "Por favor indique tipo producto" });
  }
  if (!latitud) {
    errors.push({ text: "Por favor indique la latitud" });
  }
  if (!longitud) {
    errors.push({ text: "Por favor indique la longitud" });
  }
  if (!valor) {
    errors.push({ text: "Por favor indique el valor" });
  }
  if (errors.length > 0) {
    res.render("registrar", {
      errors,
      nombre,
      ubicacion,
      tipo,
      latitud,
      longitud,
      valor,
    });
  } else {
    const newSensor = new Sensores({
      nombre,
      ubicacion,
      tipo,
      latitud,
      longitud,
      valor,
    });
    newSensor.user = req.user.id;
    await newSensor.save();
    req.flash("success_msg", "Producto adicionado correctamente");
    res.redirect("/mostrarsensores");
  }
};

module.exports = principalCtrl;