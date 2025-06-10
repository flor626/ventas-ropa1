// resources/js/Pages/DetalleProducto.jsx
import React from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import axios from 'axios';

const DetalleProducto = () => {
  const { producto, auth } = usePage().props;

  if (!producto) return <div className="p-6">Cargando producto...</div>;

  const agregarAlCarrito = () => {
    if (!auth?.user) {
      router.visit('/login');
      return;
    }

    axios.post('/carritos', {
      producto_id: producto.id,
      cantidad: 1,
    })
    .then(() => {
      alert('Producto agregado al carrito');
      router.visit('/carrito');
    })
    .catch(error => {
      console.error('Error al agregar al carrito:', error);

      if (error.response) {
        console.error('Respuesta servidor:', error.response.data);
        alert(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert('No se recibió respuesta del servidor. Intente nuevamente.');
      } else {
        alert('Error al agregar al carrito. Intenta nuevamente.');
      }
    });
  };

  return (
    <>
      <Head title={`Detalle - ${producto.nombre}`} />
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
          <img
            src={producto.imagen_url || 'https://via.placeholder.com/300'}
            alt={producto.nombre}
            className="w-full md:w-1/2 h-auto rounded object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{producto.nombre}</h2>
            <p className="text-gray-600 mb-2">Talla: {producto.talla}</p>
            <p className="text-green-600 text-xl font-semibold mb-4">S/. {producto.precio}</p>
            <p className="text-gray-700 mb-4">{producto.descripcion || 'Sin descripción.'}</p>
            <button
              onClick={agregarAlCarrito}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleProducto;
