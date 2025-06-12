<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        $user = Auth::user();

        // Redirigir según el rol del usuario
        if ($user->rol === 'encargado') {
            return redirect()->intended('/encargado/dashboard');
        }

        return redirect()->intended('/cliente/dashboard');
    }

    return back()->withErrors([
        'email' => 'Las credenciales no son válidas.',
    ]);
}
    public function storeEncargado(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    $user = $request->user();

    if ($user->rol === 'encargado') {
        return redirect()->route('panel.encargado');
    }

    // Si no es encargado, cerrar sesión y mostrar error
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('login')->withErrors([
        'email' => 'No tienes permisos para acceder como encargado.',
    ]);
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
