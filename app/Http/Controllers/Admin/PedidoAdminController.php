<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoAdminController extends Controller
{
    public function index()
    {
        $pedidos = Pedido::with('usuario')->get();
        return Inertia::render('Encargado/Pedidos/Index', ['pedidos' => $pedidos]);
    }

    public function show($id)
    {
        $pedido = Pedido::with('productos', 'usuario')->findOrFail($id);
        return Inertia::render('Encargado/Pedidos/Detalle', ['pedido' => $pedido]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:pendiente,enviado,entregado'
        ]);
    
        $pedido = Pedido::findOrFail($id);
        $pedido->estado = $request->estado;
        $pedido->save();
    
        // Aquí se puede agregar la lógica para notificar al usuario
        // por ejemplo con mail, evento, etc.
    
        return redirect()->back()->with('success', 'Estado actualizado');
    }
    

}
