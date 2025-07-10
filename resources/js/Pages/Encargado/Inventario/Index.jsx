import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Index() {
  const { inventario } = usePage().props;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Botón de regreso al Panel del Encargado */}
      <div className="mb-4">
        <Link
          href="/panel-encargado"
          className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          ← Volver al Panel del Encargado
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Inventario de Productos</h1>

      <div className="bg-white shadow rounded-lg overflow-x-auto p-4">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Producto</th>
              <th className="border px-4 py-2">Stock Disponible</th>
            </tr>
          </thead>
          <tbody>
            {inventario.map(item => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.producto.nombre}</td>
                <td className="border px-4 py-2">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
