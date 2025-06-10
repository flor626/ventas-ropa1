<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PedidoProducto extends Model
{
    public function confirmar()
{
    // Aquí puedes pasar datos si necesitas
    return Inertia::render('ConfirmarPedido');
}
}
