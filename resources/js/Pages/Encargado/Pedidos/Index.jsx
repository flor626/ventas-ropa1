import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { pedidos } = usePage().props;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      {/* Botón de regreso al Panel del Encargado */}
      <div className="mb-4">
        <Link
          href="/panel-encargado"
          className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Volver al Panel del Encargado
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Lista de Pedidos</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Usuario</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map(pedido => (
                <tr key={pedido.id}>
                  <td className="border px-4 py-2">{pedido.id}</td>
                  <td className="border px-4 py-2">{pedido.usuario.name}</td>
                  <td className="border px-4 py-2">{pedido.estado}</td>
                  <td className="border px-4 py-2">{new Date(pedido.created_at).toLocaleDateString()}</td>
                  <td className="border px-4 py-2 text-center">
                    <Link
                      href={route('encargado.pedidos.show', pedido.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No hay pedidos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
