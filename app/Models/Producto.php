<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    public function inventario() {
    return $this->hasOne(Inventario::class);
}

public function carritoProductos() {
    return $this->hasMany(CarritoProducto::class);
}

public function pedidoProductos() {
    return $this->hasMany(PedidoProducto::class);
}
}
