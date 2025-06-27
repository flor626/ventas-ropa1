import React from 'react';
import { usePage, router } from '@inertiajs/react';

export default function Detalle() {
  const { pedido } = usePage().props;

  const actualizarEstado = (nuevoEstado) => {
    router.put(`/encargado/pedidos/${pedido.id}`, {
      estado: nuevoEstado
    }, {
      onSuccess: () => alert('Estado actualizado con éxito')
    });
  };

  return (
    <div className="p-6 bg-white max-w-3xl mx-auto rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Detalle del Pedido #{pedido.id}</h1>
      <p><strong>Usuario:</strong> {pedido.usuario.name}</p>
      <p><strong>Estado:</strong> {pedido.estado}</p>
      <p><strong>Dirección:</strong> {pedido.direccion_envio}</p>

      <div className="mt-4">
        <label className="block mb-2 font-semibold">Cambiar estado:</label>
        <select
          value={pedido.estado}
          onChange={(e) => actualizarEstado(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="pendiente">Pendiente</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>

      <h2 className="mt-6 text-xl font-semibold">Productos</h2>
      <ul>
        {pedido.productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - Cantidad: {producto.pivot.cantidad} - Precio: S/. {producto.pivot.precio_unitario}
          </li>
        ))}
      </ul>
    </div>
  );
}
