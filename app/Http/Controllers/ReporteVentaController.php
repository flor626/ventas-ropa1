<?php

namespace App\Http\Controllers;

use App\Models\ReporteVenta;
use Illuminate\Http\Request;

class ReporteVentaController extends Controller
{
    public function index()
    {
        return response()->json(ReporteVenta::all());
    }

    public function store(Request $request)
    {
        $reporte = ReporteVenta::create($request->all());
        return response()->json($reporte, 201);
    }

    public function show(ReporteVenta $reporteVenta)
    {
        return response()->json($reporteVenta);
    }

    public function update(Request $request, ReporteVenta $reporteVenta)
    {
        $reporteVenta->update($request->all());
        return response()->json($reporteVenta);
    }

    public function destroy(ReporteVenta $reporteVenta)
    {
        $reporteVenta->delete();
        return response()->json(null, 204);
    }
}
