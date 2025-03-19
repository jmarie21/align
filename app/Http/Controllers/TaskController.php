<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index() {
        $task = Auth::user()->tasks()->get();
        return Inertia::render('tasks', [
            'tasks' => $task
        ]);
    }

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

    public function destroy($id) {
        $task = Task::findOrFail($id);
        $task->delete();

        return back()->with([
            'message' => "Task deleted successfully!"
        ]);
    }
}
