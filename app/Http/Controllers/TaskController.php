<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function store(Request $request, $boardId, $taskListId) {
        
        $fields = $request->validate([
            'name' => ['required']
        ]);

        $board = Auth::user()->boards()->findOrFail($boardId);
        $taskList = $board->taskLists()->findOrFail($taskListId);

        $taskList->tasks()->create($fields);

        return back()->with([
            'message' => 'Task added successfully!'
        ]);
    }

    public function destroy($boardId, $taskListId, $taskId) {
        $board = Auth::user()->boards()->findOrFail($boardId);
        $taskList = $board->taskLists()->findOrFail($taskListId);
        $task = $taskList->tasks()->findOrFail($taskId);

        $task->delete();

        return back()->with([
            'message' => 'Task deleted'
        ]);
    }
}
