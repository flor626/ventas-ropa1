import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function ProductosEnCarrito() {
  const { carritos } = usePage().props;

  return (
    <div className="p-6">
      <Head title="Productos en Carrito" />
      <h1 className="text-2xl font-bold mb-4">Productos añadidos al carrito por los usuarios</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Usuario</th>
            <th className="px-4 py-2 border">Producto</th>
            <th className="px-4 py-2 border">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {carritos.map(item => (
            <tr key={item.id}>
              <td className="px-4 py-2 border">{item.user.name}</td>
              <td className="px-4 py-2 border">{item.producto.nombre}</td>
              <td className="px-4 py-2 border">{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
