import React from 'react';

const CompleteAnswers = ({ selectedEvaluation }) => {
  if (!selectedEvaluation) {
    return <p>No hay evaluación seleccionada</p>;
  }

  const questions = selectedEvaluation.questions;
  console.log(selectedEvaluation);

  const handleAnswerChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    // Aquí podrías actualizar el estado si fuera necesario
  };

  return (
    <form>
        <span style={{fontWeight: "bold"}}>
            Titulo:{" "}
        </span>
      <span>{selectedEvaluation.title}</span>
      {questions.map((q, index) => (
        <div key={q._id}>
          <p>{q.question}</p>
          <input
            type="text"
            name="answer"
            placeholder="Escribe tu respuesta"
            value={q.answer}
            onChange={(e) => handleAnswerChange(index, e)}
            required
          />
        </div>
      ))}
    </form>
  );
};

export default CompleteAnswers;
