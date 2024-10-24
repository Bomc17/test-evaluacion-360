import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  evaluacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluacion', required: true },
  comentarios: { type: String, required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback