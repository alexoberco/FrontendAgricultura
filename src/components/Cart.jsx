import { useState, useEffect } from 'react';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Cargar items del carrito almacenados en localStorage
    const cartStr = localStorage.getItem('cart');
    if (cartStr) {
      setItems(JSON.parse(cartStr));
    }
  }, []);

  const checkout = () => {
    if (items.length === 0) return;
    // Simular creación de un nuevo pedido
    const ordersStr = localStorage.getItem('orders');
    let orders = ordersStr ? JSON.parse(ordersStr) : [];
    const newOrder = {
      id: Date.now(),  // usar timestamp como ID único
      farmerName: localStorage.getItem('userName') || 'Usuario',
      items: items,
      status: 'Pendiente'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');  // vaciar carrito
    setOrderPlaced(true);
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {orderPlaced ? (
        // Mostrar confirmación de pedido realizado
        <div className="card">
          <h3>¡Pedido realizado con éxito!</h3>
          <p>Gracias por su compra. Su pedido está en estado Pendiente.</p>
        </div>
      ) : (
        <div>
          {items.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <div>
              <ul>
                {items.map(item => (
                  <li key={item.id}>
                    {item.name} – Cantidad: {item.qty} – Precio: ${ (item.price * item.qty).toFixed(2) }
                  </li>
                ))}
              </ul>
              <p><strong>Total: ${total.toFixed(2)}</strong></p>
              <button className="btn" onClick={checkout}>Pagar (Simulado)</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
