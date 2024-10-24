import React, { useState } from 'react';

const EvaluationComponent = ({ onSubmit, evaluation }) => {
  const [form, setForm] = useState({
    selfEvaluation: '',
    colleagueEvaluation: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="selfEvaluation">Autoevaluación</label>
        <textarea
          id="selfEvaluation"
          name="selfEvaluation"
          value={form.selfEvaluation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="colleagueEvaluation">Evaluación de Colegas</label>
        <textarea
          id="colleagueEvaluation"
          name="colleagueEvaluation"
          value={form.colleagueEvaluation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="comments">Comentarios</label>
        <textarea
          id="comments"
          name="comments"
          value={form.comments}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EvaluationComponent;
