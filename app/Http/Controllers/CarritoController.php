<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CarritoController extends Controller
{
   public function index()
    {
        return response()->json(Carrito::with('productos')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        $user = Auth::user();

        // Aquí haces la lógica para agregar el producto al carrito del usuario
        // Ejemplo sencillo:

        $carrito = new Carrito();
        $carrito->user_id = $user->id;
        $carrito->producto_id = $request->producto_id;
        $carrito->cantidad = $request->cantidad;
        $carrito->save();

        return response()->json(['message' => 'Producto agregado al carrito']);
    }

    public function addProducto(Request $request, $carritoId)
    {
        $carrito = Carrito::findOrFail($carritoId);
        $carrito->productos()->attach($request->producto_id, ['cantidad' => $request->cantidad]);
        return response()->json(['message' => 'Producto agregado al carrito']);
    }

    public function removeProducto($carritoId, $productoId)
    {
        $carrito = Carrito::findOrFail($carritoId);
        $carrito->productos()->detach($productoId);
        return response()->json(['message' => 'Producto eliminado del carrito']);
    }

    public function destroy($id)
    {
        Carrito::destroy($id);
        return response()->json(null, 204);
    }
}
