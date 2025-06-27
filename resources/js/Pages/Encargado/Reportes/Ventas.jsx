import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Ventas() {
  const { ventas } = usePage().props;

  // Aquí puedes usar librerías como Chart.js para gráficos, por simplicidad mostramos tabla

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reporte de Ventas</h1>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID Venta</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td className="border px-4 py-2">{venta.id}</td>
              <td className="border px-4 py-2">{new Date(venta.created_at).toLocaleDateString()}</td>
              <td className="border px-4 py-2">S/. {venta.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
