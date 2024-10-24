import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  puesto: { type: String, required: true },
  fechaContratacion: { type: Date, default: Date.now }
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

export default Empleado;
