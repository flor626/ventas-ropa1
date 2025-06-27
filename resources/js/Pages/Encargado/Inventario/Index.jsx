import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Index() {
  const { inventario } = usePage().props;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
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
  );
}
