import Evaluacion from '../models/Evaluacion.js';

const createEvaluation = async (req, res) => {
  try {
    const { title, description, category, questions } = req.body;


    const evaluacion = new Evaluacion({
      title,
      description,
      category,
      questions,
    });


    await evaluacion.save();

    res.status(201).json({ message: 'Evaluación creada correctamente', evaluacion });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la evaluación', error: error.message });
  }
};


const getEvaluations = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find();
    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las evaluaciones', error: error.message });
  }
};



const getEvaluationById = async (req, res) => {
    try {
      const { id } = req.params;
      const evaluacion = await Evaluacion.findById(id);
  
      if (!evaluacion) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }
  
      res.status(200).json(evaluacion);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la evaluación', error: error.message });
    }
  };

const updateEvaluation = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, category, questions } = req.body;
  
      const evaluacion = await Evaluacion.findByIdAndUpdate(
        id,
        { title, description, category, questions },
        { new: true }
      );
  
      if (!evaluacion) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }
  
      res.status(200).json({ message: 'Evaluación actualizada correctamente', evaluacion });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la evaluación', error: error.message });
    }
  };


const getEvaluationsByEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      const evaluaciones = await Evaluacion.find({ employeeId: id });
  
      if (!evaluaciones.length) {
        return res.status(404).json({ message: 'No se encontraron evaluaciones para este empleado' });
      }
  
      res.status(200).json(evaluaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las evaluaciones', error: error.message });
    }
  };

export { createEvaluation, getEvaluationById, updateEvaluation, getEvaluationsByEmployee, getEvaluations };