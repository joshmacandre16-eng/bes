<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AdminProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class AdminRegisteredUserController extends Controller
{
    /**
     * Display the admin registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/AdminRegister');
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20|unique:users',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        AdminProfile::create([
            'user_id' => $user->id,
            'position' => $request->position,
            'department' => $request->department,
            'permissions' => json_encode([]),
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect('/admin/dashboard');
    }
}

