<?php

use App\Http\Controllers\BoardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');


Route::middleware('auth')->group(function() {
    Route::post('/board', [BoardController::class, 'store'])->name('board.store');
    Route::get('/board', [BoardController::class, 'index'])->name('dashboard');
    Route::delete('/board/{id}', [BoardController::class, 'destroy'])->name('board.delete');
    Route::get('/board/{id}', [BoardController::class, 'show'])->name('board.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
