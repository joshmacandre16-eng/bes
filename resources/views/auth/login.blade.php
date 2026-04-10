<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AgriShop Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-screen bg-gray-100 flex items-center justify-center p-6">

  <!-- LOADER -->
  <div id="loader" class="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div class="flex flex-col items-center gap-4">
      <div class="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-sm text-gray-500 font-semibold">Loading AgriShop...</p>
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

        <span class="inline-block bg-green-900/40 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wide">
          HINOBAAN EXCLUSIVE
        </span>

        <h2 class="text-white font-extrabold text-2xl mb-3">
          The official marketplace for CPSU-BSAB students
        </h2>

        <p class="text-white/70 text-sm mb-7">
          Everything a BSAB student needs — uniforms, textbooks, field tools, and seeds —
          available exclusively for the Hinobaan campus community.
        </p>

        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">📍</div>
            <div>
              <p class="text-white font-bold text-sm">Hinobaan, Negros Occidental</p>
              <p class="text-white/50 text-xs">CPSU Main Campus — local agri students only</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">⭐</div>
            <div>
              <p class="text-white font-bold text-sm">15% student discount</p>
              <p class="text-white/50 text-xs">Exclusive pricing for enrolled BSAB students</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <div class="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">🛒</div>
            <div>
              <p class="text-white font-bold text-sm">Uniforms, tools & seeds</p>
              <p class="text-white/50 text-xs">All BSAB essentials in one curated shop</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-[#4caf50] rounded-full flex items-center justify-center text-white font-bold text-sm">
          CP
        </div>
        <div>
          <p class="text-white font-bold text-xs">CPSU BSAB</p>
          <p class="text-white/50 text-xs">Official Student Platform</p>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="bg-white p-10 flex flex-col justify-center">

      <div class="mb-7">
        <h2 class="text-gray-900 font-extrabold text-2xl mb-1.5">Welcome back</h2>
        <p class="text-gray-500 text-sm">Sign in to your AgriShop account to continue.</p>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 text-xs font-semibold mb-6 flex items-center gap-2">
        🔒 Access restricted to CPSU-BSAB Hinobaan students
      </div>

      <form class="space-y-4">

        <div>
          <label class="text-gray-700 font-semibold text-sm">Email address</label>
          <input type="email" placeholder="you@cpsu.edu.ph"
            class="mt-1.5 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700">
        </div>

        <div>
          <div class="flex justify-between mb-1.5">
            <label class="text-gray-700 font-semibold text-sm">Password</label>
            <a href="#" class="text-xs text-green-700 font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <input type="password" placeholder="••••••••"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700">
        </div>

        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded border-gray-300 text-green-700 focus:ring-green-700">
          <span class="text-sm text-gray-600">Remember me</span>
        </label>

        <button type="submit"
          class="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 text-sm font-bold rounded-lg tracking-wide">
          Log in to AgriShop
        </button>

        <p class="text-center text-xs text-gray-400 pt-2">
          Don't have an account?
          <a href="{{route('register')}}" class="text-green-700 font-semibold hover:underline">
            Register here
          </a>
        </p>

      </form>

      <div class="border-t border-gray-100 mt-6 pt-5 text-center">
        <p class="text-xs text-gray-300">CPSU-BSAB AgriShop · Hinobaan, Negros Occidental</p>
      </div>

    </div>
  </div>

  <!-- SCRIPT -->
  <script>
    // LOADER
    window.addEventListener("load", () => {
      const loader = document.getElementById("loader");
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => loader.remove(), 500);
      }, 800);
    });

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.querySelector('input[type="email"]');
      const password = document.querySelector('input[type="password"]');
      const button = form.querySelector("button");

      if (!email.value.endsWith("@cpsu.edu.ph")) {
        alert("Only CPSU email addresses are allowed.");
        email.focus();
        return;
      }

      if (password.value.length < 6) {
        alert("Password must be at least 6 characters.");
        password.focus();
        return;
      }

      button.disabled = true;
      button.innerText = "Signing in...";

      setTimeout(() => {
        alert("Login successful (demo)");
        button.disabled = false;
        button.innerText = "Log in to AgriShop";
      }, 1500);
    });

    // Disable copy/paste on password
    const passwordField = document.querySelector('input[type="password"]');
    passwordField.addEventListener("paste", e => e.preventDefault());
    passwordField.addEventListener("copy", e => e.preventDefault());

    // Disable right click
    document.addEventListener("contextmenu", e => e.preventDefault());

    // DevTools detection
    setInterval(() => {
      if (window.outerWidth - window.innerWidth > 160) {
        console.clear();
        console.log("DevTools detected");
      }
    }, 1000);
  </script>

</body>
</html>