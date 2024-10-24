import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String },
});

const evaluacionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  questions: [questionSchema],
  date: { type: Date, default: Date.now },
});

const Evaluacion = mongoose.model('Evaluacion', evaluacionSchema);

export default Evaluacion;
