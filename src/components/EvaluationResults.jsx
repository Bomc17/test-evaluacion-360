import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  { name: 'Comunicación', autoevaluación: 4, colegas: 3.8 },
  { name: 'Liderazgo', autoevaluación: 4.5, colegas: 4.2 },
  { name: 'Trabajo en Equipo', autoevaluación: 4.2, colegas: 4.0 },
  { name: 'Creatividad', autoevaluación: 3.8, colegas: 4.1 },
];

const EvaluationResults = () => {
  return (
    <div>
      <h2>Resultados de Evaluación</h2>

      <h3>Gráfico de Barras</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="autoevaluación" fill="#8884d8" />
        <Bar dataKey="colegas" fill="#82ca9d" />
      </BarChart>

      <h3>Gráfico de Radar</h3>
      <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Autoevaluación" dataKey="autoevaluación" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Colegas" dataKey="colegas" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default EvaluationResults;
