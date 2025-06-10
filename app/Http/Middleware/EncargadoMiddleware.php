<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ✅ Usa la facade Auth correcta
use Illuminate\Http\Response;         // ✅ Usa Response de Laravel

class EncargadoMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->rol === 'encargado') {
            return $next($request);
        }

        abort(403, 'No tienes permiso para acceder a esta página.');
    }
    
}
