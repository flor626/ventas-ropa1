import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function Reportes() {
  const { resumenVentas } = usePage().props;

  return (
    <div className="p-6">
      <Head title="Reporte de Ventas" />
      <h1 className="text-2xl font-bold mb-4">Reporte de Ventas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold">Ventas Totales</h2>
          <p className="text-2xl">{resumenVentas.total} S/.</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold">Pedidos del Mes</h2>
          <p className="text-2xl">{resumenVentas.pedidosMes}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="font-semibold">Producto Más Vendido</h2>
          <p className="text-xl">{resumenVentas.productoTop}</p>
        </div>
      </div>

      {/* Aquí puedes insertar gráficos con Chart.js o Recharts si deseas */}
    </div>
  );
}
