import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';

const ListadoProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('/encargado/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('Error al cargar productos:', error));
  }, []);

  const eliminarProducto = (id) => {
    if (!confirm('¿Estás seguro que deseas eliminar este producto?')) return;

    axios.delete(`/encargado/productos/${id}`)
      .then(() => {
        setProductos(productos.filter(p => p.id !== id));
      })
      .catch(error => alert('Error al eliminar producto'));
  };

  return (
    <>
      <Head title="Listado de Productos" />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Listado de Productos</h1>
          <Link 
            href="/encargado/productos/agregar" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Agregar Producto
          </Link>
        </div>

        {productos.length === 0 ? (
          <p className="text-gray-600">No hay productos registrados.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Imagen</th>
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Talla</th>
                <th className="py-2 px-4 text-left">Precio</th>
                <th className="py-2 px-4 text-left">Stock</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <img src={producto.imagen_url} alt={producto.nombre} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4">{producto.nombre}</td>
                  <td className="py-2 px-4">{producto.talla}</td>
                  <td className="py-2 px-4">S/. {producto.precio.toFixed(2)}</td>
                  <td className="py-2 px-4">{producto.stock}</td>
                  <td className="py-2 px-4 space-x-2">
                    <Link 
                      href={`/encargado/productos/editar/${producto.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ListadoProductos;
