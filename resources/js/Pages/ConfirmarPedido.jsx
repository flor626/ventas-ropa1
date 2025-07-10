import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';

const ConfirmacionPedido = () => {
  const [items, setItems] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('/carritos')
      .then(response => {
        setItems(response.data);
        calcularTotal(response.data);
      })
      .catch(error => console.error('Error al cargar carrito:', error));
  }, []);

  const calcularTotal = (carrito) => {
    const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
    setTotal(total);
  };

  const confirmarPedido = () => {
    if (direccion.trim() === '') {
      alert('Por favor, ingresa una dirección de envío.');
      return;
    }

    const productosFormateados = items.map(item => ({
      id: item.producto.id,
      cantidad: item.cantidad,
      precio: item.producto.precio
    }));

    axios.post('/pedidos', {
      direccion_envio: direccion,
      total: total,
      productos: productosFormateados
    })
      .then(() => {
        alert('Pedido confirmado. ¡Gracias por tu compra!');
        router.visit('/historial');
      })
      .catch(error => {
        console.error('Error al confirmar pedido:', error.response ? error.response.data : error.message);
        alert('Hubo un problema al confirmar el pedido.');
      });
  };

  return (
    <>
      <Head title="Confirmar Pedido" />
      <div className="min-h-screen bg-gray-100 p-6">
        {/* CONTENEDOR GENERAL */}
        <div className="max-w-xl mx-auto mb-6">
          {/* BOTÓN FLECHA IZQUIERDA */}
          <Link
            href="/carrito"
            className="inline-block bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition mb-4"
          >
            ← Volver al carrito
          </Link>

          {/* TÍTULO CENTRADO */}
          <h1 className="text-2xl font-bold text-center">📦 Confirmación de Pedido</h1>
        </div>

        {items.length === 0 ? (
          <p className="text-center text-gray-600">Tu carrito está vacío.</p>
        ) : (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Resumen de tu compra</h2>

            {items.map(item => (
              <div key={item.id} className="border-b py-3 flex justify-between">
                <div>
                  <p className="font-semibold">{item.producto.nombre} (x{item.cantidad})</p>
                  <p className="text-sm text-gray-600">Talla: {item.producto.talla}</p>
                </div>
                <p className="text-green-700 font-medium">
                  S/. {(item.producto.precio * item.cantidad).toFixed(2)}
                </p>
              </div>
            ))}

            <p className="mt-4 text-right text-lg font-bold">
              Total: S/. {total.toFixed(2)}
            </p>

            <div className="mt-6">
              <label className="block font-medium mb-2">Dirección de envío</label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Ej. Av. Los Héroes 123, Lima"
              />
            </div>

            <button
              onClick={confirmarPedido}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Realizar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmacionPedido;
