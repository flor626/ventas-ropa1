<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\ReporteVentaController;
use App\Http\Controllers\Admin\ProductoAdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Rutas Públicas
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Catalogo', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/encargado/dashboard', function () {
    return Inertia::render('Encargado/Dashboard');
})->middleware(['auth', 'rol:encargado']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cliente/dashboard', function () {
        return Inertia::render('Cliente/Dashboard');
    })->name('cliente.dashboard');

    Route::get('/encargado/dashboard', function () {
        return Inertia::render('Encargado/Dashboard');
    })->name('encargado.dashboard');
});
/*
|--------------------------------------------------------------------------
| Rutas de Autenticación y Perfil
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Carrito y Pedidos para Usuario
    Route::get('/carrito', fn () => Inertia::render('Carrito'))->name('carrito');
    Route::get('/confirmar', fn () => Inertia::render('ConfirmarPedido'))->name('confirmar.pedido');
    Route::get('/historial', fn () => Inertia::render('HistorialPedidos'))->name('historial.pedidos');
    Route::post('/pedidos', [PedidoController::class, 'store'])->name('pedidos.store');

});

/*
|--------------------------------------------------------------------------
| Rutas para el Panel del Encargado
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'encargado'])->prefix('encargado')->group(function () {
    // Dashboard del encargado
    Route::get('/', fn () => Inertia::render('Encargado/Dashboard'))->name('encargado.dashboard');

    // Productos
    Route::get('/productos', fn () => Inertia::render('Encargado/Productos/Index'))->name('encargado.productos.index');
    Route::get('/productos/agregar', fn () => Inertia::render('Encargado/Productos/Agregar'))->name('encargado.productos.agregar');
    Route::get('/productos/{id}/editar', fn ($id) => Inertia::render('Encargado/Productos/Editar', ['id' => $id]))->name('encargado.productos.editar');
    Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('detalle.producto');

    // Pedidos
    Route::get('/pedidos', fn () => Inertia::render('Encargado/Pedidos/Index'))->name('encargado.pedidos.index');
    Route::get('/pedidos/{id}', fn ($id) => Inertia::render('Encargado/Pedidos/Detalle', ['id' => $id]))->name('encargado.pedidos.detalle');

    // Inventario y Reportes
    Route::get('/inventario', fn () => Inertia::render('Encargado/Inventario'))->name('encargado.inventario');
    Route::get('/reportes', fn () => Inertia::render('Encargado/Reportes'))->name('encargado.reportes');

    // Carritos (administración)
    Route::get('/carritos', [CarritoController::class, 'index'])->name('encargado.carritos.index');
    Route::post('/carritos', [CarritoController::class, 'store'])->name('encargado.carritos.store');
    Route::put('/carritos/{id}', [CarritoController::class, 'update'])->name('encargado.carritos.update');
    Route::delete('/carritos/{id}', [CarritoController::class, 'destroy'])->name('encargado.carritos.destroy');

    /*
    |--------------------------------------------------------------------------
    | Panel Admin (Dentro del módulo Encargado)
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->group(function () {
        Route::get('/panel', fn () => Inertia::render('Encargado/Panel'))->name('admin.panel');

        // CRUD Productos Admin
        Route::get('/productos', [ProductoAdminController::class, 'index'])->name('admin.productos.index');
        Route::get('/productos/crear', [ProductoAdminController::class, 'create'])->name('admin.productos.create');
        Route::post('/productos', [ProductoAdminController::class, 'store'])->name('admin.productos.store');
        Route::get('/productos/{id}/editar', [ProductoAdminController::class, 'edit'])->name('admin.productos.edit');
        Route::put('/productos/{id}', [ProductoAdminController::class, 'update'])->name('admin.productos.update');
        Route::delete('/productos/{id}', [ProductoAdminController::class, 'destroy'])->name('admin.productos.destroy');
    });
});
Route::get('/login/cliente', fn () => Inertia::render('Auth/Login', ['tipo' => 'cliente']));
Route::get('/login/encargado', fn () => Inertia::render('Auth/Login', ['tipo' => 'encargado']));


/*
|--------------------------------------------------------------------------
| Ruta de Login personalizada para el Encargado
|--------------------------------------------------------------------------
*/
Route::post('/login-encargado', [AuthenticatedSessionController::class, 'storeEncargado'])
    ->middleware('guest')
    ->name('login.encargado');

/*
|--------------------------------------------------------------------------
| API REST (para Inertia + React)
|--------------------------------------------------------------------------
*/
Route::resources([
    'productos'   => ProductoController::class,
    'carritos'    => CarritoController::class,
    'pedidos'     => PedidoController::class,
    'inventarios' => InventarioController::class,
    'reportes'    => ReporteVentaController::class,
]);

// Rutas de autenticación predeterminadas de Laravel Breeze/Fortify
require __DIR__ . '/auth.php';