import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';

const initialFormState = {
  title: '',
  description: '',
  category: '',
  questions: [{ question: '', answer: '' }],
};

const EvaluationForm = ({ initialData, onCreate, onSubmit }) => {
  const [form, setForm] = useState(initialData || initialFormState);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const questions = [...form.questions];
    questions[index][name] = value;
    setForm({ ...form, questions });
  };

  const handleAddQuestion = () => {
    setForm({ ...form, questions: [...form.questions, { question: '', answer: '' }] });
  };

  const handleRemoveQuestion = (index) => {
    const questions = [...form.questions];
    questions.splice(index, 1);
    setForm({ ...form, questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAccessToken();
    const method = form._id ? 'PUT' : 'POST';
    const url = `http://localhost:3000/api/evaluations${form._id ? `/${form._id}` : ''}`;
    console.log(url);
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Evaluación guardada correctamente:', data);
        if (method === 'POST' && onCreate) {
          onCreate(data);
        } else if (onSubmit) {
          onSubmit(data);
        }
      } else {
        const errorData = await response.json();
        console.error('Error al guardar la evaluación:', errorData.message);
      }
    } catch (error) {
      console.error('Error al guardar la evaluación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          name="description"
          id="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Categoría:</label>
        <input
          type="text"
          name="category"
          id="category"
          value={form.category}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Preguntas:</label>
        {form.questions.map((q, index) => (
          <div key={index}>
            <input
              id="question"
              type="text"
              name="question"
              placeholder="Pregunta"
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e)}
              required
            />

            <button type="button" onClick={() => handleRemoveQuestion(index)}>Eliminar Pregunta</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>Añadir Pregunta</button>
      </div>
      <button type="submit">Guardar Evaluación</button>
    </form>
  );
};

export default EvaluationForm;
