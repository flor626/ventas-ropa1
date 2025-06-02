// resources/js/Pages/Encargado/Panel.jsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';

const PanelEncargado = () => {
  return (
    <>
      <Head title="Panel del Encargado" />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">🛠️ Panel del Encargado</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/encargado/productos" className="bg-white p-6 shadow rounded hover:bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">📦 Gestión de Productos</h2>
            <p className="text-gray-600">Agregar, editar o eliminar productos.</p>
          </Link>

          <Link href="/encargado/pedidos" className="bg-white p-6 shadow rounded hover:bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">📋 Gestión de Pedidos</h2>
            <p className="text-gray-600">Ver y actualizar pedidos recibidos.</p>
          </Link>

          <Link href="/encargado/inventario" className="bg-white p-6 shadow rounded hover:bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">📊 Inventario</h2>
            <p className="text-gray-600">Control del stock disponible.</p>
          </Link>

          <Link href="/encargado/carritos" className="bg-white p-6 shadow rounded hover:bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">🛒 Productos en Carrito</h2>
            <p className="text-gray-600">Ver qué productos están en los carritos.</p>
          </Link>

          <Link href="/encargado/reportes" className="bg-white p-6 shadow rounded hover:bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">📈 Reporte de Ventas</h2>
            <p className="text-gray-600">Resumen y análisis mensual de ventas.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PanelEncargado;
