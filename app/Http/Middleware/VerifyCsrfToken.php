<?php
namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    protected $except = [
        'carritos', // Excluir la ruta para el carrito
        'api/*',    // Excluir todas las rutas API si tienes una API
    ];
}
