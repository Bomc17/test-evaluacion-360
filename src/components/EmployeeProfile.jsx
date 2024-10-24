import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';

const EmployeeProfile = () => {
  const { user, getAccessToken } = useAuth();
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      const token = getAccessToken();
      const response = await fetch(`http://localhost:3000/api/evaluations/employee/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvaluations(data.evaluations);
      }
    };

    fetchEvaluations();
  }, [user, getAccessToken]);

  return (
    <div>
      <h2>Perfil de Empleado</h2>
      <div>
        <strong>Nombre:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <h3>Historial de Evaluaciones</h3>
        <ul>
          {evaluations.map((evaluation) => (
            <li key={evaluation.id}>{evaluation.title} - {evaluation.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeProfile;
