import Empleado from "../models/Empleado.js";

const getEmployees = async (req, res) => {
  try {
    const allEmployees = await Empleado.find().populate('usuario', 'name'); // Poblamos el campo 
    const employees = allEmployees.map(emp => ({
      id: emp._id,
      name: emp.usuario.name,
      puesto: emp.puesto,
      fechaContratacion: emp.fechaContratacion
    }));
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getEmployees };
