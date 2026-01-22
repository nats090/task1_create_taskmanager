<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Task;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // List all employees
    public function index()
    {
        return response()->json(User::all());
    }

    // Get tasks for a specific user
    public function tasks($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user->tasks);
    }

    // Login (secure: email + password)
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Hide sensitive fields
            $user->makeHidden(['password', 'remember_token']);

            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Logout
    public function logout()
    {
        return response()->json(['message' => 'Logout successful']);
    }
}
