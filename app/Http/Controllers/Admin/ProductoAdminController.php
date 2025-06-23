<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoAdminController extends Controller
{
    public function index()
    {
        $productos = Producto::all();

    return Inertia::render('Encargado/Productos/Index', [
        'productos' => $productos
    ]);
    }

    public function create()
{
    return Inertia::render('Encargado/Productos/Agregar');
}


public function store(Request $request)
{
    $validated = $request->validate([
        'nombre' => 'required|string|max:255',
        'descripcion' => 'nullable|string',
        'talla' => 'required|string|max:50',
        'precio' => 'required|numeric|min:0',
        'imagen' => 'nullable|string|max:255', // si es ruta o nombre
    ]);

    Producto::create($validated);

    return redirect()->route('encargado.productos.index')->with('success', 'Producto agregado correctamente');
}


    public function edit($id)
    {
        return Inertia::render('Encargado/Productos/Edit', [
            'producto' => Producto::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());

        return redirect()->route('admin.productos.index');
    }

    public function destroy($id)
    {
        Producto::destroy($id);
        return redirect()->route('admin.productos.index');
    }
}
