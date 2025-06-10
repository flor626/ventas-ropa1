<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }

    // ✅ Cambiar a belongsTo (uno a uno)
    public function producto() {
        return $this->belongsTo(Producto::class);
    }
}
