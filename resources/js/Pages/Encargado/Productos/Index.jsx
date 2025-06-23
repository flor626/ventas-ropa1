import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function Index() {
    const { productos } = usePage().props;

    const handleEliminar = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            router.delete(route('encargado.productos.destroy', id), {
                onSuccess: () => {
                    // Recomendado: recargar la página o quitar el producto del array manualmente
                }
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Productos Registrados</h1>

            <Link href={route('encargado.productos.agregar')} className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded">
                + Agregar nuevo producto
            </Link>

            <table className="min-w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Precio</th>
                        <th className="border px-4 py-2">Stock</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        productos.map(producto => (
                            <tr key={producto.id}>
                                <td className="border px-4 py-2">{producto.id}</td>
                                <td className="border px-4 py-2">{producto.nombre}</td>
                                <td className="border px-4 py-2">S/. {producto.precio}</td>
                                <td className="border px-4 py-2">{producto.stock}</td>
                                <td className="border px-4 py-2">
                                    <Link href={route('encargado.productos.editar', producto.id)} className="text-blue-600 mr-2">Editar</Link>
                                    <button onClick={() => handleEliminar(producto.id)} className="text-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center p-4">No hay productos registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
