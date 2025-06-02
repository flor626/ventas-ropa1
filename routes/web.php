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

/*
|--------------------------------------------------------------------------
| Rutas para Usuarios Autenticados
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Carrito y pedidos
    Route::get('/carrito', fn () => Inertia::render('Carrito'));
    Route::get('/confirmar', fn () => Inertia::render('ConfirmarPedido'));

    // Historial
    Route::get('/historial', fn () => Inertia::render('HistorialPedidos'));
});

/*
|--------------------------------------------------------------------------
| Rutas para el Panel del Encargado
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'encargado'])->prefix('encargado')->group(function () {
    Route::get('/', fn () => Inertia::render('Encargado/Dashboard'));

    // Productos
    Route::get('/productos', fn () => Inertia::render('Encargado/Productos/Index'));
    Route::get('/productos/agregar', fn () => Inertia::render('Encargado/Productos/Agregar'));
    Route::get('/productos/{id}/editar', fn ($id) => Inertia::render('Encargado/Productos/Editar', ['id' => $id]));
Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('detalle.producto');
Route::get('/productos/{id}', [ProductoController::class, 'show']);


    // Pedidos
    Route::get('/pedidos', fn () => Inertia::render('Encargado/Pedidos/Index'));
    Route::get('/pedidos/{id}', fn ($id) => Inertia::render('Encargado/Pedidos/Detalle', ['id' => $id]));

    // Otros
    Route::get('/inventario', fn () => Inertia::render('Encargado/Inventario'));
    Route::get('/carritos', fn () => Inertia::render('Encargado/ProductosEnCarrito'));
    Route::get('/reportes', fn () => Inertia::render('Encargado/Reportes'));

    Route::middleware('auth')->group(function () {
    Route::get('/carritos', [CarritoController::class, 'index']);
    Route::post('/carritos', [CarritoController::class, 'store']);
    Route::put('/carritos/{id}', [CarritoController::class, 'update']);
    Route::delete('/carritos/{id}', [CarritoController::class, 'destroy']);
});


});

/*
|--------------------------------------------------------------------------
| API REST para Inertia + React
|--------------------------------------------------------------------------
*/

Route::resources([
    'productos' => ProductoController::class,
    'carritos' => CarritoController::class,
    'pedidos' => PedidoController::class,
    'inventarios' => InventarioController::class,
    'reportes' => ReporteVentaController::class,
]);

require __DIR__ . '/auth.php';
