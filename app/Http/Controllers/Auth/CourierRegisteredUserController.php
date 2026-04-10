<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\CourierProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class CourierRegisteredUserController extends Controller
{
    /**
     * Display the courier registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/CourierRegister');
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
            'full_name' => 'required|string|max:255',
            'national_id' => 'required|string|unique:courier_profiles|max:50',
            'driver_license' => 'required|string|unique:courier_profiles|max:50',
            'vehicle_type' => 'required|in:motorcycle,car,bicycle',
            'vehicle_plate' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'courier',
        ]);

        CourierProfile::create([
            'user_id' => $user->id,
            'full_name' => $request->full_name,
            'national_id' => $request->national_id,
            'driver_license' => $request->driver_license,
            'vehicle_type' => $request->vehicle_type,
            'vehicle_plate' => $request->vehicle_plate,
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect('/courier/dashboard');
    }
}
