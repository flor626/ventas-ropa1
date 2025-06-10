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
        return Inertia::render('Encargado/Panel');

    }

    public function create()
    {
        return Inertia::render('Encargado/Productos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'nullable',
            'precio' => 'required|numeric',
            'talla' => 'required',
            'imagen' => 'nullable|url',
            'stock' => 'required|integer'
        ]);

        Producto::create($request->all());

        return redirect()->route('admin.productos.index');
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
