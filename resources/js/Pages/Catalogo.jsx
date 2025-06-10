// resources/js/Pages/Catalogo.jsx
import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const { auth, canLogin, canRegister } = usePage().props;

  useEffect(() => {
    axios.get('/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <>
      <Head title="Catálogo de Productos" />

      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-2xl font-bold">🧥 Ropa Online</div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="border p-2 rounded"
            />

            <Link href="/carrito" className="text-blue-600 hover:underline">🛒 Ver Carrito</Link>

            {!auth?.user && (
              <>
                {canLogin && (
                  <>
                    <Link href="/login" className="text-blue-600 hover:underline">Iniciar como Cliente</Link>
                    <Link href="/login?admin=true" className="text-red-600 hover:underline">Iniciar como Encargado</Link>
                  </>
                )}
                {canRegister && (
                  <Link href="/register" className="text-green-600 hover:underline">Registrarse</Link>
                )}
              </>
            )}

            {auth?.user && (
              <span className="text-gray-700">Hola, {auth.user.name}</span>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map(producto => (
            <div key={producto.id} className="bg-white shadow rounded p-4">
              <img
                src={producto.imagen_url || 'https://via.placeholder.com/150'}
                alt={producto.nombre}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              <p className="text-gray-500">Talla: {producto.talla}</p>
              <p className="text-green-600 font-bold">S/. {producto.precio}</p>
              <Link
                href={`/productos/${producto.id}`}
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ver Detalle
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
