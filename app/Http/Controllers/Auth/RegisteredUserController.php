<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\BuyerProfile;
use App\Models\SellerProfile;
use App\Models\CourierProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'buyer',
        ]);

        BuyerProfile::create([
            'user_id' => $user->id,
        ]);

        event(new Registered($user));
        Auth::login($user);

        // Redirect based on role
        $redirectRoute = match($user->role) {
            'buyer' => '/buyer/dashboard', 
            'admin' => '/admin/dashboard',
            'seller' => '/seller/dashboard',
            'courier' => '/courier/dashboard',
            default => '/buyer/dashboard',
        };

        return redirect($redirectRoute);
    }
}

