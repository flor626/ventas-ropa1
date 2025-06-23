import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Agregar() {
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    talla: '',
    precio: '',
    imagen: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post(route('encargado.productos.store'), form, {
      onSuccess: () => {
        alert('Producto agregado correctamente');
        setForm({ nombre: '', descripcion: '', talla: '', precio: '', imagen: '' });
        setErrors({});
      },
      onError: (errors) => setErrors(errors),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
        {errors.nombre && <p className="text-red-600">{errors.nombre}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
        {errors.descripcion && <p className="text-red-600">{errors.descripcion}</p>}
      </div>

      <div>
        <label>Talla:</label>
        <input type="text" name="talla" value={form.talla} onChange={handleChange} />
        {errors.talla && <p className="text-red-600">{errors.talla}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" step="0.01" name="precio" value={form.precio} onChange={handleChange} />
        {errors.precio && <p className="text-red-600">{errors.precio}</p>}
      </div>

      <div>
        <label>Imagen (URL o nombre):</label>
        <input type="text" name="imagen" value={form.imagen} onChange={handleChange} />
        {errors.imagen && <p className="text-red-600">{errors.imagen}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Guardar</button>
    </form>
  );
}
