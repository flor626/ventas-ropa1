<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'talla',
        'precio',
        'imagen', // si es ruta o nombre
    ];
    public function inventario() {
    return $this->hasOne(Inventario::class);
}

public function carritoProductos() {
    return $this->hasMany(CarritoProducto::class);
}

public function pedidoProductos() {
    return $this->hasMany(PedidoProducto::class);
}
public function pedidos()
{
    return $this->belongsToMany(Pedido::class, 'pedido_productos')
                ->withPivot('cantidad', 'precio_unitario')
                ->withTimestamps();
}

}
