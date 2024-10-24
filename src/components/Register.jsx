import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  rol: ''
}


const Register = () => {
  const [form, setForm] = useState(initialState)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Error en el regsitro: ", json);
        setError(json.error || 'Error desconocido');
      } else {
        alert('Registro exitoso');
        
        navigate('/auth/login');
  
      }

      
    } catch (error) {
      console.error('Error:', error);
    }

  };


  const handleInput = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
      })
  }

  return (
    <div className="container">
      <div className="inner-container">
        <div className="form-container">
          <h2>Registro</h2>
        </div>
        <div className="form-container">
          <form  onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="input"
                onChange={handleInput}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="input"
                onChange={handleInput}
              />
            </div>
            <div className="input-group">
              <label htmlFor="rol">Roles</label>
              <select 
                className='input'
                name="rol" 
                id="rol"
                onChange={handleInput}>
                    <option value="">---</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Empleado</option>
                </select>
            </div>
            <div className="input-group">
              <div className="label-group">
                <label htmlFor="password">Password</label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="input"
                onChange={handleInput}
              />
            </div>
            <div>
              <button type="submit" className="submit-button">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
