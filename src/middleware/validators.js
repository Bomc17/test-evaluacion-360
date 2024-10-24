import {body} from 'express-validator'

const userValidation = () => {
    return [
        body('email').isEmail().withMessage('El email no es válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('rol').isIn(['admin', 'manager', 'employee']).withMessage('El rol debe ser admin, manager o employee'),
        body('name').not().isEmpty().withMessage('El nombre de usuario es obligatorio')
      ]
}

export default userValidation