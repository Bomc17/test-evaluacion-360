import React, { useState, useEffect } from 'react';
import EvaluationForm from './EvaluationForm';
import { useAuth } from '../context/auth';
import CompleteAnwers from './CompleteAnwers';

const initialFormState = {
  title: '',
  description: '',
  category: '',
  questions: [{ question: '', answer: '' }],
};

const EvaluationCompleteForm = ({ evaluations, setEvaluations, handleEvaluationClick, selectedEvaluation, handleFormSubmit }) => {
  const { getAccessToken } = useAuth();
  

  useEffect(() => {
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

    fetchEvaluations();
  }, [getAccessToken, setEvaluations]);


  return (
    <div className="card">
      <div className="card-header">
        <h3>Lista de Evaluaciones</h3>
        <p>Haz clic en una evaluación para editarla</p>
      </div>
      <div className="card-content">
        <ul>
          {evaluations.map((evaluation) => {
            const date = new Date(evaluation.date);
            const formattedDate = isNaN(date) ? 'Fecha Inválida' : date.toLocaleDateString();
            return (
              <li key={evaluation._id} onClick={() => handleEvaluationClick(evaluation)}>
                {evaluation.title} - {formattedDate}
              </li>
            );
          })}
        </ul>
        {selectedEvaluation && (
          <CompleteAnwers selectedEvaluation={selectedEvaluation} />
        )}
      </div>
    </div>
  );
};

export default EvaluationCompleteForm;


