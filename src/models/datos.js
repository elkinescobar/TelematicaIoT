const { Schema, model } = require("mongoose");

const ClimaSchema = new Schema(
  {
    humedad: { type: String},
    temperatura: {type: String},
  }
);

module.exports = model("Datosensor", ClimaSchema);