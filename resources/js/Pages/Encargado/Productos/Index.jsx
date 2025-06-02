import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

const Crear = () => {
  const [form, setForm] = useState({
    nombre: '',
    talla: '',
    precio: '',
    stock: '',
    imagen: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setForm({ ...form, imagen: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in form) {
      data.append(key, form[key]);
    }

    router.post('/encargado/productos', data);
  };

  return (
    <>
      <Head title="Agregar Producto" />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Producto</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre:</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Talla:</label>
            <input type="text" name="talla" value={form.talla} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Precio:</label>
            <input type="number" name="precio" value={form.precio} onChange={handleChange} required step="0.01" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Stock:</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} required className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Imagen:</label>
            <input type="file" name="imagen" onChange={handleChange} accept="image/*" className="w-full" />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar Producto</button>
        </form>
      </div>
    </>
  );
};

export default Crear;
