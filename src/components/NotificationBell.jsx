import { useState, useEffect } from 'react';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "Nuevo mensaje en el foro: respuesta a tu pregunta",
    "Pedido #1001 ha sido enviado"
  ]);

  // Simular llegada de una nueva notificación después de 5 segundos (ej: alerta de sensor IoT)
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => [
        ...prev,
        "Alerta: Nivel de humedad bajo en Sensor 3"
      ]);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className={`notifications${open ? ' open' : ''}`} style={{ marginRight: '1rem' }}>
      {/* Botón de campana con contador de notificaciones */}
      <button onClick={toggleOpen}>
        🔔 {notifications.length}
      </button>
      {/* Lista desplegable de notificaciones */}
      <div className="notifications-list">
        {notifications.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>
    </div>
  );
}
