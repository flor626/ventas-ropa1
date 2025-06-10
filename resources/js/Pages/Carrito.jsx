// resources/js/Pages/Carrito.jsx
import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';


const Carrito = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const cargarCarrito = () => {
    axios.get('/carritos')
      .then(response => {
        setItems(response.data);
        calcularTotal(response.data);
      })
      .catch(error => console.error('Error al cargar carrito:', error));
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const calcularTotal = (carrito) => {
    const total = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    setTotal(total);
  };

  const cambiarCantidad = (id, cantidad) => {
    axios.put(`/carritos/${id}`, { cantidad })
      .then(() => cargarCarrito())
      .catch(error => console.error('Error al actualizar cantidad:', error));
  };

  const eliminarItem = (id) => {
    axios.delete(`/carritos/${id}`)
      .then(() => cargarCarrito())
      .catch(error => console.error('Error al eliminar item:', error));
  };

  return (
    <>
      <Head title="Carrito de Compras" />

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">🛒 Carrito de Compras</h1>

        {items.length === 0 ? (
          <p className="text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <div className="bg-white p-4 shadow rounded">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.producto.imagen_url || 'https://via.placeholder.com/80'}
                    alt={item.producto.nombre}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.producto.nombre}</h3>
                    <p className="text-gray-500">Talla: {item.producto.talla}</p>
                    <p className="text-green-600">S/. {item.producto.precio}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => cambiarCantidad(item.id, e.target.value)}
                    className="w-16 border px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => eliminarItem(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-4">
              <p className="text-lg font-bold">Total: S/. {total.toFixed(2)}</p>
              <Link
                href="/confirmar-pedido"
                className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirmar pedido
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Carrito;
