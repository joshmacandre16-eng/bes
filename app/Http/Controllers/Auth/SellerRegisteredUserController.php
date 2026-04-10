<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SellerProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class SellerRegisteredUserController extends Controller
{
    /**
     * Display the seller registration view.
     */
    public function create()
    {
        return Inertia::render('Auth/SellerRegister');
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
            'store_name' => 'required|string|max:255',
            'store_slug' => 'required|string|unique:seller_profiles|max:255',
            'business_license' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'tax_id' => 'required|string|max:50',
            'bank_account_name' => 'required|string|max:255',
            'bank_account_number' => 'required|string|max:50',
            'bank_name' => 'required|string|max:100',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'seller',
        ]);

        SellerProfile::create([
            'user_id' => $user->id,
            'store_name' => $request->store_name,
            'store_slug' => $request->store_slug,
            'business_license' => $request->file('business_license')->store('licenses', 'public'),
            'tax_id' => $request->tax_id,
            'bank_account_name' => $request->bank_account_name,
            'bank_account_number' => $request->bank_account_number,
            'bank_name' => $request->bank_name,
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect('/seller/dashboard');
    }
}
