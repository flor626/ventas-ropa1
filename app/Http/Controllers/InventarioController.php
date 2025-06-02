<?php

namespace App\Http\Controllers;

use App\Models\Inventario;
use Illuminate\Http\Request;

class InventarioController extends Controller
{
     public function index()
    {
        return response()->json(Inventario::with('producto')->get());
    }

    public function store(Request $request)
    {
        $inventario = Inventario::create($request->all());
        return response()->json($inventario, 201);
    }

    public function update(Request $request, Inventario $inventario)
    {
        $inventario->update($request->all());
        return response()->json($inventario);
    }

    public function destroy(Inventario $inventario)
    {
        $inventario->delete();
        return response()->json(null, 204);
    }
}
