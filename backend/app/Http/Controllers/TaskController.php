<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // List all tasks
    public function index()
    {
        return response()->json(Task::all());
    }

    // Show a single task
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // Create new task
    public function store(Request $request)
    {
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    // Update task
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }

    // Update only status
    public function updateStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->status = $request->status;
        $task->save();

        return response()->json($task);
    }

    // Delete task
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(['message' => 'Task deleted']);
    }
}
