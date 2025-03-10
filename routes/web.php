<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');


Route::middleware('auth')->group(function() {
    Route::post('/board', [BoardController::class, 'store'])->name('board.store');
    Route::get('/board', [BoardController::class, 'index'])->name('dashboard');
    Route::delete('/board/{id}', [BoardController::class, 'destroy'])->name('board.delete');
    Route::get('/board/{boardName}', [BoardController::class, 'show'])->name('board.show');

    Route::post('/board/{id}/task-list', [TaskListController::class, 'storeList'])->name('list.storeList');

    Route::post('/board/{board}/task-list/{taskList}/task', [TaskController::class, 'store'])->name('task.store');
    Route::delete('/board/{board}/task-list/{taskList}/task/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
