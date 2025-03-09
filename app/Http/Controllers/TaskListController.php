<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskListController extends Controller
{
    public function storeList(Request $request, $boardId) {

        $fields = $request->validate([
            'name' => ['required'],
        ]);

        $board = Auth::user()->boards()->findOrFail($boardId);

        $board->taskLists()->create($fields);

        return back()->with([
            'message' => 'Task list added successfully!'
        ]);
    }

    
}
