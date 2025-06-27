<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReporteVentaAdminController extends Controller
{
    public function index()
    {
        // Aquí prepararás datos de ventas, por ejemplo resumen mensual
        $ventas = Venta::all();
        return Inertia::render('Encargado/Reportes/Ventas', ['ventas' => $ventas]);
    }
}
