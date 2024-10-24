import React, { useState } from 'react';
import '../App.css';
import { useAuth } from '../context/auth';
import { Navigate } from 'react-router-dom';
const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState(initialState);
  const auth = useAuth();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const json = await response.json();
        if (json.token) {
          auth.saveUser(json);
        }
      } else {
        alert('Error en el login: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      <div className="inner-container">
        <div className="form-container">
          <h2>Iniciar sesión</h2>
        </div>
        <div className="form-container">
          <form noValidate onSubmit={handleSubmit} className="form">
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
              <div className="label-group">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
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
              <button type="submit" className="submit-button">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
