<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

// ✅ User routes
Route::get('/users', [UserController::class, 'index']); // List all employees
Route::get('/users/{id}/tasks', [UserController::class, 'tasks']); // Get tasks for a user
Route::post('/login', [UserController::class, 'login']); // Login
Route::post('/logout', [UserController::class, 'logout']); // Logout

// ✅ Task routes
Route::get('/tasks', [TaskController::class, 'index']); // List all tasks
Route::get('/tasks/{id}', [TaskController::class, 'show']); // Get task details
Route::post('/tasks', [TaskController::class, 'store']); // Create new task
Route::put('/tasks/{id}', [TaskController::class, 'update']); // Update task
Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']); // Update status only
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // Delete task

// ✅ Optional: fallback for 404 debugging
Route::fallback(function () {
    return response()->json(['error' => 'Route not found'], 404);
});

