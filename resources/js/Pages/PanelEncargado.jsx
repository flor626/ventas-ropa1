import React from 'react';
import { Head, router } from '@inertiajs/react';

const PanelEncargado = () => {

  const navegar = (ruta) => {
    router.visit(ruta);
  };

  return (
    <>
      <Head title="Panel de Encargado" />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Panel de Encargado</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div 
            onClick={() => navegar('/encargado/productos')}
            className="cursor-pointer bg-white p-6 rounded shadow hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">🛍️ Gestión de Productos</h2>
            <p>Agregar, editar o eliminar productos.</p>
          </div>

          <div 
            onClick={() => navegar('/encargado/pedidos')}
            className="cursor-pointer bg-white p-6 rounded shadow hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">📦 Gestión de Pedidos</h2>
            <p>Ver y actualizar el estado de los pedidos.</p>
          </div>

          <div 
            onClick={() => navegar('/encargado/inventario')}
            className="cursor-pointer bg-white p-6 rounded shadow hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">📊 Inventario</h2>
            <p>Visualizar stock disponible por producto.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default PanelEncargado;
