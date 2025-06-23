<?php
//Mideleware/EncargadoMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ✅ Usa la facade Auth correcta
use Illuminate\Http\Response;         // ✅ Usa Response de Laravel

class CheckRole
{
    public function handle($request, Closure $next, $rol)
{
    if (! $request->user() || $request->user()->rol !== $rol) {
        abort(403, 'No autorizado');
    }

    return $next($request);
}

    
}
