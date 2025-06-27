<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inventario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventarioAdminController extends Controller
{
    public function index()
    {
        $inventario = Inventario::with('producto')->get();
        return Inertia::render('Encargado/Inventario/Index', ['inventario' => $inventario]);
    }
}
