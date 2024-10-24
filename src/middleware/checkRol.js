const checkRol = (rol) => {
    return (req, res, next) => {
      
      if (req.user && req.user.rol === rol) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied: Insufficient role' });
      }
    };
  };
  
export default checkRol
  