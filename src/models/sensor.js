const { Schema, model } = require("mongoose");

const sensorSchema = new Schema({
    nombre: { type: String, required: true },
    ubicacion: { type: String, required: true },
    tipo: { type: String, required: true },
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
    valor: { type: Number, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
);

module.exports = model("sensor", sensorSchema);
