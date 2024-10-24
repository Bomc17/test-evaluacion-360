import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';
import { getEmployees } from '../controllers/employeeController.js';
import verifyToken from '../middleware/verifyToken.js'
import checkRol from '../middleware/checkRol.js'
import { checkExistingUser } from '../middleware/verifyRegister.js';
import userValidation from '../middleware/validators.js';
import { createEvaluation, getEvaluationById, updateEvaluation, getEvaluationsByEmployee , getEvaluations} from '../controllers/evaluationController.js';


// Rutas de autenticación
router.post('/auth/register', [userValidation(), checkExistingUser], register);
router.post('/auth/login', login);

// Rutas protegidas para empleados
router.get('/employees', verifyToken, checkRol('admin'), getEmployees);

// Rutas para evaluaciones
router.post('/evaluations', [verifyToken, checkRol('admin')], createEvaluation);

router.get('/evaluations', verifyToken, getEvaluations);

router.get('/evaluations/:id', verifyToken, getEvaluationById);

router.put('/evaluations/:id', verifyToken, checkRol('admin'), updateEvaluation);

router.get('/evaluations/employee/:id', verifyToken, getEvaluationsByEmployee);

// Rutas para feedback
router.post('/feedback', verifyToken);

// Rutas para reportes
router.get('/reports/employee/:id', verifyToken, checkRol('admin'));

export default router;
