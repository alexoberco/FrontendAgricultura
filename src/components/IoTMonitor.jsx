import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function IoTMonitor() {
  // Datos simulados iniciales del sensor (tiempo vs valor de humedad)
  const [data, setData] = useState([
    { time: 0, value: 20 },
    { time: 1, value: 22 },
    { time: 2, value: 21 },
    { time: 3, value: 23 }
  ]);

  useEffect(() => {
    // Actualizar datos cada 3 segundos simulando nuevas lecturas IoT
    const interval = setInterval(() => {
      setData(prevData => {
        const lastTime = prevData.length ? prevData[prevData.length - 1].time : 0;
        // Generar un nuevo valor aleatorio fluctuando el último valor
        let newValue = prevData.length ? prevData[prevData.length - 1].value : 0;
        newValue += (Math.random() * 4 - 2);  // variación aleatoria
        newValue = parseFloat(Math.max(0, Math.min(100, newValue)).toFixed(1));
        const newData = [...prevData, { time: lastTime + 1, value: newValue }];
        // Mantener solo los últimos 20 puntos para no crecer indefinidamente
        if (newData.length > 20) newData.shift();
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Comprobar si el último valor supera umbrales para mostrar alerta (ej: <15% o >85%)
  const latestValue = data.length ? data[data.length - 1].value : null;
  const alert = latestValue !== null && (latestValue < 15 || latestValue > 85);

  return (
    <div>
      <h3>Sensor de Humedad del Suelo (simulado)</h3>
      {alert && (
        <p className="text-danger">
          ⚠ Alerta: Valor fuera de rango: {latestValue}%
        </p>
      )}
      {/* Gráfico de línea de Recharts */}
      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" label={{ value: 'Tiempo', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Humedad (%)', angle: -90, position: 'insideLeft' }} domain={[0, 100]} />
        <Tooltip />
      </LineChart>
    </div>
  );
}
