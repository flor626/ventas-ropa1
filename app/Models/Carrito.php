<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    public function user() {
    return $this->belongsTo(User::class);
}

public function productos() {
    return $this->belongsToMany(Producto::class, 'carrito_productos')
                ->withPivot('cantidad')
                ->withTimestamps();
}

}
