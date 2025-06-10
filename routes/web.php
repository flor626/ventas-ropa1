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
    Route::get('/confirmar-pedido', [PedidoController::class, 'confirmar'])->middleware('auth');

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


Route::middleware(['auth', 'encargado'])->group(function () {
    Route::get('/admin/panel', fn() => Inertia::render('Encargado/Panel'))->name('admin.panel');
    Route::get('/admin/productos', [ProductoAdminController::class, 'index'])->name('admin.productos.index');
    Route::get('/admin/productos/crear', [ProductoAdminController::class, 'create'])->name('admin.productos.create');
    Route::post('/admin/productos', [ProductoAdminController::class, 'store'])->name('admin.productos.store');
    Route::get('/admin/productos/{id}/editar', [ProductoAdminController::class, 'edit'])->name('admin.productos.edit');
    Route::put('/admin/productos/{id}', [ProductoAdminController::class, 'update'])->name('admin.productos.update');
    Route::delete('/admin/productos/{id}', [ProductoAdminController::class, 'destroy'])->name('admin.productos.destroy');
});

Route::post('/login-encargado', [AuthenticatedSessionController::class, 'storeEncargado'])
    ->middleware(['guest'])
    ->name('login.encargado');

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
