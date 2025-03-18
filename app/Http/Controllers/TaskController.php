<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'task_name' => ['required', 'max:255']
        ]);

        $user = Auth::user();

        $user->tasks()->create($validated);

        return back()->with([
            'message' => 'Task created successfully.'
        ]);
    }
}
