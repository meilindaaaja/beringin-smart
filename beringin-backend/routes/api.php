<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LaporanController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/laporan', [LaporanController::class, 'index']);

    Route::post('/laporan', [LaporanController::class, 'store']);

    Route::patch('/laporan/{id}/status', [
        LaporanController::class,
        'updateStatus'
    ]);

    Route::delete('/laporan/{id}', [
        LaporanController::class,
        'destroy'
    ]);
});
