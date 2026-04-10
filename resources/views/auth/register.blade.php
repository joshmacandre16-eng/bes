<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AgriShop Register</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-screen bg-gray-100 flex items-center justify-center p-6">

  <!-- LOADER -->
  <div id="loader" class="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-500 font-semibold">Preparing AgriShop...</p>
    </div>
  </div>

  <div class="w-full  grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">

    <!-- LEFT PANEL -->
    <div class="bg-[#1f4d1f] p-10 flex flex-col justify-between min-h-[580px]">

      <div>
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 bg-[#4caf50] rounded-lg flex items-center justify-center text-white font-bold">
            🌿
          </div>
          <span class="font-extrabold text-xl text-white">
            Agri<span class="text-[#4caf50]">Shop</span>
          </span>
        </div>

        <span class="inline-block bg-green-900/40 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
          HINOBAAN EXCLUSIVE
        </span>

        <h2 class="text-white font-extrabold text-2xl mb-3">
          Join the CPSU-BSAB Marketplace
        </h2>

        <p class="text-white/70 text-sm mb-7">
          Register and get access to uniforms, seeds, tools, and exclusive student pricing.
        </p>

        <div class="space-y-4">
          <div class="flex gap-3">
            <div class="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">📍</div>
            <p class="text-white text-sm">Hinobaan Campus Only</p>
          </div>
          <div class="flex gap-3">
            <div class="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">⭐</div>
            <p class="text-white text-sm">Student-only discounts</p>
          </div>
          <div class="flex gap-3">
            <div class="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">🛒</div>
            <p class="text-white text-sm">All agri essentials in one place</p>
          </div>
        </div>
      </div>

      <p class="text-white/40 text-xs">CPSU-BSAB AgriShop</p>
    </div>

    <!-- RIGHT PANEL -->
    <div class="bg-white p-10 flex flex-col justify-center">

      <div class="mb-6">
        <h2 class="text-2xl font-extrabold text-gray-900">Create Account</h2>
        <p class="text-gray-500 text-sm">Register to access AgriShop</p>
      </div>

      <form id="registerForm" class="space-y-4">

        <!-- Name -->
        <div>
          <label class="text-sm font-semibold text-gray-700">Full Name</label>
          <input type="text" id="name"
            class="mt-1.5 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
            placeholder="Juan Dela Cruz" required>
        </div>

        <!-- Email -->
        <div>
          <label class="text-sm font-semibold text-gray-700">Email Address</label>
          <input type="email" id="email"
            class="mt-1.5 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
            placeholder="you@cpsu.edu.ph" required>
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm font-semibold text-gray-700">Password</label>
          <input type="password" id="password"
            class="mt-1.5 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
            placeholder="••••••••" required>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="text-sm font-semibold text-gray-700">Confirm Password</label>
          <input type="password" id="confirmPassword"
            class="mt-1.5 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700"
            placeholder="••••••••" required>
        </div>

        <!-- Button -->
        <button type="submit"
          class="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-lg font-bold text-sm">
          Register to AgriShop
        </button>

        <!-- Login -->
        <p class="text-center text-xs text-gray-400">
          Already registered?
          <a href="{{ route('login') }}" class="text-green-700 font-semibold hover:underline">Login here</a>
        </p>

      </form>

    </div>
  </div>

  <!-- SCRIPT -->
  <script>
    // LOADER
    window.addEventListener("load", () => {
      const loader = document.getElementById("loader");
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "0.5s";
        setTimeout(() => loader.remove(), 500);
      }, 800);
    });

    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirmPassword");

      // VALIDATION
      if (name.value.length < 3) {
        alert("Name must be at least 3 characters.");
        return;
      }

      if (!email.value.endsWith("@cpsu.edu.ph")) {
        alert("Only CPSU email allowed.");
        return;
      }

      if (password.value.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
        return;
      }

      const button = form.querySelector("button");
      button.disabled = true;
      button.innerText = "Creating account...";

      setTimeout(() => {
        alert("Registration successful (demo)");
        button.disabled = false;
        button.innerText = "Register to AgriShop";
      }, 1500);
    });

    // BASIC PROTECTION
    document.addEventListener("contextmenu", e => e.preventDefault());

    document.querySelectorAll("input[type='password']").forEach(input => {
      input.addEventListener("paste", e => e.preventDefault());
    });
  </script>

</body>
</html>