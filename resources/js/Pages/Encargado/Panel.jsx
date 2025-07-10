import React from 'react';
import { Head, Link } from '@inertiajs/react';

const Panel = () => {
  return (
    <>
      <Head title="Panel del Encargado" />

      <div className="min-h-screen bg-gray-100 p-6">
        {/* BOTÓN PARA VOLVER AL DASHBOARD */}
        <div className="mb-4">
          <Link
            href="/encargado/dashboard"
            className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            ← Volver al Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Panel de Control - Encargado</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* CARD - Productos */}
          <Link
            href={route('encargado.productos.index')}
            className="bg-white rounded-lg shadow hover:shadow-md p-6 text-center border border-blue-200 hover:border-blue-400 transition"
          >
            <div className="text-5xl mb-3">🛍️</div>
            <h2 className="text-xl font-semibold text-blue-600">Gestionar Productos</h2>
          </Link>

          {/* CARD - Pedidos */}
          <Link
            href={route('encargado.pedidos.index')}
            className="bg-white rounded-lg shadow hover:shadow-md p-6 text-center border border-green-200 hover:border-green-400 transition"
          >
            <div className="text-5xl mb-3">📦</div>
            <h2 className="text-xl font-semibold text-green-600">Ver Pedidos</h2>
          </Link>

          {/* CARD - Inventario */}
          <Link
            href={route('encargado.inventario.index')}
            className="bg-white rounded-lg shadow hover:shadow-md p-6 text-center border border-yellow-200 hover:border-yellow-400 transition"
          >
            <div className="text-5xl mb-3">📊</div>
            <h2 className="text-xl font-semibold text-yellow-600">Inventario</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Panel;
