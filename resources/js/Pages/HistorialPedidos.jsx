import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

const HistorialPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    axios.get('/pedidos/usuario')
      .then(response => setPedidos(response.data))
      .catch(error => console.error('Error al cargar pedidos:', error));
  }, []);

  return (
    <>
      <Head title="Historial de Pedidos" />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">🧾 Historial de Pedidos</h1>

        {pedidos.length === 0 ? (
          <p className="text-gray-600">No tienes pedidos realizados.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Fecha</th>
                <th className="py-2 px-4 text-left">Productos</th>
                <th className="py-2 px-4 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(pedido => (
                <tr key={pedido.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{new Date(pedido.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    {pedido.productos.map(prod => (
                      <div key={prod.id}>{prod.nombre} (x{prod.cantidad})</div>
                    ))}
                  </td>
                  <td className="py-2 px-4">
                    <span className={
                      pedido.estado === 'pendiente' ? 'text-yellow-600' :
                      pedido.estado === 'enviado' ? 'text-blue-600' :
                      pedido.estado === 'entregado' ? 'text-green-600' : 'text-gray-600'
                    }>
                      {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default HistorialPedidos;
