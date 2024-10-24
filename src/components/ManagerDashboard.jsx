import React, { useState, useEffect } from 'react';

import { useAuth } from '../context/auth';
import EvaluationCompleteForm from './EvaluationCompleteForm';

const ManagerDashboard = ({ user }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const currentRole = user.rol;
  const { getAccessToken } = useAuth();
  const UserRole = {
    Admin: 'admin',
    Manager: 'manager',
    Employee: 'employee',
  };

  const fetchEvaluations = async () => {
    const token = getAccessToken();
    try {
      const response = await fetch('http://localhost:3000/api/evaluations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvaluations(data);
      } else {
        console.error('Error al obtener las evaluaciones:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener las evaluaciones:', error);
    }
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);


  const handleFormSubmit = (data) => {
    console.log('Evaluación actualizada:', data);
    
    const newData = data.evaluacion
    
    if (selectedEvaluation) {
      setEvaluations((prevEvaluations) =>
        prevEvaluations.map((eva) => (eva._id === newData._id ? newData : eva))
      );
    } else {
      setEvaluations((prevEvaluations) => [...prevEvaluations, newData]);
    }
    setSelectedEvaluation(null);
  };


  const handleEvaluationClick = (evaluation) => {
    setSelectedEvaluation(evaluation);
  };

  const handleLogOut = () => {
    signout()
  }

  return (
    <div className="container-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Dashboard</h1>
        </div>
        <nav className="sidebar-nav">
          <button className="sidebar-button">
            <a href="#"><span className="icon-layout"></span> Overview</a>
          </button>
          {currentRole !== UserRole.Employee && (
            <button className="sidebar-button">
              <a href="#"><span className="icon-users"></span> Equipo</a>
            </button>
          )}
          <button className="sidebar-button">
            <a href="#"><span className="icon-file-text"></span> Reportes</a>
          </button>
          {currentRole === UserRole.Admin && (
            <button className="sidebar-button">
              <a href="#"><span className="icon-settings"></span> Ajustes</a>
            </button>
          )}
        </nav>
      </aside>
      <main className="main-content">
        <div className="header">
          <h2>Bienveni@, {user.id}</h2>
          <div className="header-actions">
            <button className="icon-button">
              <span className="icon-bell"></span>
            </button>
            <div className="dropdown-menu">
              <button className="avatar-button">
                <img src={user.avatar} alt={user.name} className="avatar-image" />
                <span className="avatar-fallback">{user.id}</span>
              </button>
              <div className="dropdown-content">
                <div className="dropdown-label">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
                <div className="dropdown-separator"></div>
                <div className="dropdown-item">
                  <span className="icon-settings"></span>
                  <span>Settings</span>
                </div>
                <div className="dropdown-item">
                  <span className="icon-logout"></span>
                  <span>Log out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="role-specific-content">
            {(currentRole === UserRole.Admin || currentRole === UserRole.Manager) && (
              
            <EvaluationCompleteForm 
                evaluations={evaluations}
                setEvaluations={setEvaluations}
                handleEvaluationClick={handleEvaluationClick}
                selectedEvaluation={selectedEvaluation}
                handleFormSubmit={handleFormSubmit}
            />
            )}
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
