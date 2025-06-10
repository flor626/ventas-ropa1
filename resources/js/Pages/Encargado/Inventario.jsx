import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function Inventario() {
  const { productos } = usePage().props;

  return (
    <div className="p-6">
      <Head title="Inventario" />
      <h1 className="text-2xl font-bold mb-4">Inventario de Productos</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Talla</th>
            <th className="px-4 py-2 border">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td className="px-4 py-2 border">{producto.nombre}</td>
              <td className="px-4 py-2 border">{producto.talla}</td>
              <td className="px-4 py-2 border">{producto.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
