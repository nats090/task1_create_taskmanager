<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    // List all tasks (with assigned employees and admin)
    public function index()
    {
        return response()->json(Task::with(['users', 'admin'])->get());
    }

    // Show a single task
    public function show($id)
    {
        $task = Task::with(['users', 'admin'])->findOrFail($id);
        return response()->json($task);
    }

    // ✅ Create new task and assign employees
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|string',
            'user_ids' => 'nullable|array', // ✅ optional
            'admin_id' => 'required|exists:users,id'
            ]);


        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'admin_id' => $request->admin_id,
        ]);

        // Attach employees
        $task->users()->attach($request->user_ids);

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task->load(['users', 'admin'])
        ], 201);
    }

    // Update task and reassign employees
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->only(['title', 'description', 'status']));

        if ($request->has('user_ids')) {
            $task->users()->sync($request->user_ids);
        }

        return response()->json($task->load(['users', 'admin']));
    }

    // Update only status
    public function updateStatus(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->status = $request->status;
        $task->save();

        return response()->json($task->load(['users', 'admin']));
    }

    // Delete task
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(['message' => 'Task deleted']);
    }
}
