import dotenv from 'dotenv';
dotenv.config();
import User from '../models/Usuario.js'
import Empleado from '../models/Empleado.js';
import jwt from 'jsonwebtoken'
import {validationResult} from 'express-validator'

const SECRET_KEY = process.env.SECRET_KEY;



const register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }


    const { name, email, password, rol } = req.body;

    try {
        const user = await User.create({ name, email, password, rol });

        await Empleado.create({
            usuario: user.id,
            puesto: user.rol,
            fechaContratacion: new Date()
        })
        
        const token = jwt.sign({ id: user.id , role: user.rol}, SECRET_KEY, {
            expiresIn: 86400, // 24 hours
        });
        res.status(201).json({message: 'Usuario creado exitosamente', token});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        
        const user = await User.findOne({email: email})
        
        

        if (!user) return res.status(400).json({message: "User not found"})
        
        const validPassword = await user.isCorrectPassword(password, user.password)
        if (!validPassword){
            return res.status(401).json({
                token: null,
                message:"Invalid Password"
            })
        }

        const token = jwt.sign({ id: user.id , rol: user.rol, username: user.name}, SECRET_KEY, {
            expiresIn: 86400, // 24 hours
        });

        
        res.status(201).json({ token: token });

        
    } catch (error) {
        console.error('Error en el servidor:', error); 
        res.status(500).json({ error: error.message });
      }
}

export {
    register,
    login
}