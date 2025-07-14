import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

const Catalogo = () => {
  const { productos: todosLosProductos = [], auth, canLogin, canRegister } = usePage().props;
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = todosLosProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <Head title="Catálogo de Productos" />
      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex flex-wrap justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center gap-3">
  {/* Círculo verde con ícono de camiseta */}
  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-green-500 text-white text-2xl shadow-md">
    🛍️
  </div>
  <span className="text-3xl font-bold text-green-700">Ropa Economica</span>

 
</div>

          <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <Link
              href="/carrito"
              className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-600 transition duration-300"
            >
              🛒 Carrito
            </Link>
            {auth ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Hola, <strong>{auth.name}</strong></span>
                <Link href="/perfil" className="text-purple-600 font-medium hover:underline">Perfil</Link>
                <form method="POST" action="/logout">
                  <button type="submit" className="text-red-600 font-medium hover:underline">
                    Cerrar sesión
                  </button>
                </form>
              </div>
            ) : (
              <>
                {canLogin && (
                  <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition duration-300">
                    Iniciar Sesión
                  </Link>
                )}
                {canRegister && (
                  <Link href="/register" className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-600 transition duration-300">
                    Registrarse
                  </Link>
                )}
              </>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <div key={producto.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={producto.imagen ? `/storage/productos/${producto.imagen}` : 'https://via.placeholder.com/150'}
                alt={producto.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">Talla: {producto.talla}</p>
                <p className="text-green-600 font-semibold text-base mt-1">S/. {producto.precio}</p>
                <Link
                  href={`/productos/${producto.id}`}
                  className="mt-3 inline-block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 font-semibold rounded-xl shadow-md hover:from-green-600 hover:to-green-700 hover:shadow-lg transition duration-300"
                >
                  👕 Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Catalogo;
