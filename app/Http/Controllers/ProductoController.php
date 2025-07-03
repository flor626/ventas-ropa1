<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProductoController extends Controller
{
    public function index()
{
    $productos = \App\Models\Producto::all();

    return Inertia::render('Catalogo', [
        'productos' => $productos,
        'auth' => Auth::user(),
        'canLogin' => true,
        'canRegister' => true,
    ]);
}



    public function store(Request $request)
    {
        $producto = Producto::create($request->all());
        return response()->json($producto, 201);
    }

    public function show($id)
    {
        $producto = Producto::findOrFail($id);

        return Inertia::render('DetalleProducto', [
            'producto' => $producto
        ]);
    }

    public function update(Request $request, Producto $producto)
    {
        $producto->update($request->all());
        return response()->json($producto);
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();
        return response()->json(null, 204);
    }
}
