import Feedback from '../models/Feedback.js';
import Evaluacion from '../models/Evaluacion.js';

export const sendFeedback = async (req, res) => {
  try {
    const { evaluacionId, comentarios, puntuacion } = req.body;

    const evaluacion = await Evaluacion.findById(evaluacionId);
    if (!evaluacion) {
      return res.status(404).json({ message: 'Evaluación no encontrada' });
    }


    const feedback = new Feedback({
      evaluacion: evaluacionId,
      comentarios,
      puntuacion,
    });

    await feedback.save();

    res.status(201).json({ message: 'Feedback enviado correctamente', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el feedback', error: error.message });
  }
};
