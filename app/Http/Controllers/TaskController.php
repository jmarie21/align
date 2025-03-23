<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index() {
        $user = Auth::user();
        $tasks = $user->tasks()->latest()->get();
        return Inertia::render('tasks', [
            'tasks' => $tasks
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50'],
            'description' => ['required', 'string', 'max:1000']
        ]);

        $user = Auth::user();
        $user->tasks()->create($validated);

        return back()->with([
            'message' => 'Task created successfully!'
        ]);
    }
}
