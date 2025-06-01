export default function AddToCartButton({ product }) {
  const handleAdd = () => {
    // Obtener carrito actual de localStorage (o iniciar uno nuevo)
    const cartStr = localStorage.getItem('cart');
    let cart = cartStr ? JSON.parse(cartStr) : [];
    // Verificar si el producto ya estaba en el carrito
    const index = cart.findIndex(item => item.id === product.id);
    if (index >= 0) {
      cart[index].qty += 1;  // incrementar cantidad
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Producto "${product.name}" añadido al carrito.`);
  };

  return (
    <button className="btn" onClick={handleAdd}>Añadir al carrito</button>
  );
}
