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
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\ProductoAdminController;
use App\Http\Controllers\Admin\PedidoAdminController;
use App\Http\Controllers\Admin\InventarioAdminController;
use App\Http\Controllers\Admin\ReporteVentaAdminController;

/*
|--------------------------------------------------------------------------
| Ruta principal: Muestra el catálogo de productos
|--------------------------------------------------------------------------
*/

Route::get('/', [ProductoController::class, 'index']);

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

/*
|--------------------------------------------------------------------------
| Paneles y Dashboard
|--------------------------------------------------------------------------
*/

Route::get('/encargado/dashboard', function () {
    return Inertia::render('Encargado/Dashboard');
})->middleware(['auth', 'rol:encargado']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/cliente/dashboard', fn () => Inertia::render('Cliente/Dashboard'))->name('cliente.dashboard');
    Route::get('/encargado/dashboard', fn () => Inertia::render('Encargado/Dashboard'))->name('encargado.dashboard');
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/carrito', fn () => Inertia::render('Carrito'))->name('carrito');
    Route::get('/confirmar', fn () => Inertia::render('ConfirmarPedido'))->name('confirmar.pedido');
    Route::get('/historial', fn () => Inertia::render('HistorialPedidos'))->name('historial.pedidos');
    Route::post('/pedidos', [PedidoController::class, 'store'])->name('pedidos.store');
});

/*
|--------------------------------------------------------------------------
| Perfil
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/panel-encargado', fn () => Inertia::render('Encargado/Panel'))->middleware(['auth']);

/*
|--------------------------------------------------------------------------
| Encargado: Productos, Pedidos, Inventario
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('encargado')->group(function () {
    Route::get('/', fn () => Inertia::render('Encargado/Dashboard'))->name('encargado.dashboard');

    Route::get('/productos', [ProductoAdminController::class, 'index'])->name('encargado.productos.index');
    Route::get('/productos/agregar', [ProductoAdminController::class, 'create'])->name('encargado.productos.agregar');
    Route::post('/productos', [ProductoAdminController::class, 'store'])->name('encargado.productos.store');
    Route::get('/productos/{id}/editar', [ProductoAdminController::class, 'edit'])->name('encargado.productos.editar');
    Route::put('/productos/{id}', [ProductoAdminController::class, 'update'])->name('encargado.productos.update');
    Route::delete('/productos/{id}', [ProductoAdminController::class, 'destroy'])->name('encargado.productos.destroy');

    Route::get('/pedidos', [PedidoAdminController::class, 'index'])->name('encargado.pedidos.index');
    Route::get('/pedidos/{id}', [PedidoAdminController::class, 'show'])->name('encargado.pedidos.show');
    Route::put('/pedidos/{id}', [PedidoAdminController::class, 'update'])->name('encargado.pedidos.update');

    Route::get('/inventario', [InventarioAdminController::class, 'index'])->name('encargado.inventario.index');
});

/*
|--------------------------------------------------------------------------
| Login Personalizado
|--------------------------------------------------------------------------
*/

Route::get('/login/cliente', fn () => Inertia::render('Auth/Login', ['tipo' => 'cliente']));
Route::get('/login/encargado', fn () => Inertia::render('Auth/Login', ['tipo' => 'encargado']));
Route::post('/login-encargado', [AuthenticatedSessionController::class, 'storeEncargado'])->middleware('guest')->name('login.encargado');

/*
|--------------------------------------------------------------------------
| API REST
|--------------------------------------------------------------------------
*/

Route::resources([
    'productos'   => ProductoController::class,
    'carritos'    => CarritoController::class,
    'pedidos'     => PedidoController::class,
    'inventarios' => InventarioController::class,
    'reportes'    => ReporteVentaController::class,
]);

require __DIR__ . '/auth.php';
