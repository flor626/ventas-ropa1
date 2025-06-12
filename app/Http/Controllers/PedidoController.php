<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use App\Models\Carrito;

class PedidoController extends Controller
{
    public function index()
    {
        return response()->json(Pedido::with('productos')->get());
    }

    public function store(Request $request)
{
    $request->validate([
    'direccion_envio' => 'required|string|max:255',
    'total' => 'required|numeric|min:0',
    'productos' => 'required|array|min:1',
    'productos.*.id' => 'required|integer|exists:productos,id', // Verifica que el ID del producto exista
    'productos.*.cantidad' => 'required|integer|min:1',
    'productos.*.precio' => 'required|numeric|min:0',
]);

    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'Usuario no autenticado'], 401);
    }

    $pedido = Pedido::create([
        'user_id' => $user->id,
        'direccion_envio' => $request->direccion_envio,
        'estado' => 'pendiente',
        'total' => $request->total
    ]);
Carrito::where('user_id', $user->id)->delete();

    foreach ($request->productos as $producto) {
        $pedido->productos()->attach($producto['id'], [
            'cantidad' => $producto['cantidad'],
            'precio_unitario' => $producto['precio']
        ]);
    }

    return response()->json(['message' => 'Pedido registrado']);
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
     public function confirmar()
{
    return Inertia::render('ConfirmarPedido');
}

public function __construct()
{
    $this->middleware('auth');
}


}
