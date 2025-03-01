<?php

use App\Http\Controllers\BoardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');


Route::middleware('auth')->group(function() {
    Route::post('/dashboard', [BoardController::class, 'store'])->name('board.store');
    Route::get('/dashboard', [BoardController::class, 'index'])->name('dashboard');
    Route::delete('/dashboard/{id}', [BoardController::class, 'destroy'])->name('board.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
