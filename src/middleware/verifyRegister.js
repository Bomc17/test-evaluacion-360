import User from "../models/Usuario.js";


export const checkExistingUser = async (req, res, next) => {
    try {
      const userFound = await User.findOne({ name: req.body.name });
      if (userFound)
        return res.status(400).json({ message: "El usuario ya existe" });
  
      const email = await User.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "El email ya existe" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};