import { useState } from 'react';

// Posibles recomendaciones simuladas que podría dar una IA agrícola
const recommendations = [
  "Se recomienda regar el campo norte en las próximas 24 horas.",
  "Aplicar fertilizante nitrogenado en 3 días para el cultivo de maíz.",
  "Realizar monitoreo de plagas, se detectó posible infestación temprana.",
  "Incrementar frecuencia de riego en la parcela 2 debido a baja humedad."
];

export default function AIRecommender() {
  const [recommendation, setRecommendation] = useState("");

  const generateRecommendation = () => {
    // Elegir una recomendación aleatoria
    const rec = recommendations[Math.floor(Math.random() * recommendations.length)];
    setRecommendation(rec);
  };

  return (
    <div>
      <p>Haga clic para generar una recomendación basada en los datos:</p>
      <button className="btn" onClick={generateRecommendation}>Generar Recomendación</button>
      {recommendation && (
        <div className="card">
          <h4>Recomendación</h4>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}
