import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { pedidos } = usePage().props;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Pedidos</h1>
      <table className="table-auto w-full border-collapse border">
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
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td className="border px-4 py-2">{pedido.id}</td>
              <td className="border px-4 py-2">{pedido.usuario.name}</td>
              <td className="border px-4 py-2">{pedido.estado}</td>
              <td className="border px-4 py-2">{new Date(pedido.created_at).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <Link href={route('encargado.pedidos.show', pedido.id)} className="text-blue-600">Ver Detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
