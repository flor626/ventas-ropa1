<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index()
    {
        return response()->json(Pedido::with('productos')->get());
    }

    public function store(Request $request)
    {
        $pedido = Pedido::create([
            'user_id' => $request->user()->id,
            'direccion_envio' => $request->direccion_envio,
            'estado' => 'pendiente',
            'total' => $request->total
        ]);

        foreach ($request->productos as $producto) {
            $pedido->productos()->attach($producto['id'], [
                'cantidad' => $producto['cantidad'],
                'precio_unitario' => $producto['precio']
            ]);
        }

        return response()->json($pedido, 201);
    }

    public function show(Pedido $pedido)
    {
        return response()->json($pedido->load('productos'));
    }

    public function update(Request $request, Pedido $pedido)
    {
        $pedido->update($request->only('estado'));
        return response()->json($pedido);
    }

    public function destroy(Pedido $pedido)
    {
        $pedido->delete();
        return response()->json(null, 204);
    }
}
