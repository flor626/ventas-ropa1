<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth; // Asegúrate de importar la facade Auth

class VerificarRol
{
    public function handle(Request $request, Closure $next, $rol): Response
    {
        // Suponiendo que tu modelo User tiene un campo 'rol'
        if (Auth::check() && Auth::user()->rol === $rol) {
            return $next($request);
        }

        abort(403, 'Acceso no autorizado');
    }
}
