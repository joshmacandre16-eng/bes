import { useState, useEffect, Link } from "react";
import { useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Register() {
    const [showLoader, setShowLoader] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    // Loader hide after mount
    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setShowLoader(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    // Basic protection
    useEffect(() => {
        const handleContext = (e) => e.preventDefault();
        document.addEventListener("contextmenu", handleContext);

        const inputs = document.querySelectorAll("input[type='password']");
        const handlePaste = (e) => e.preventDefault();
        inputs.forEach((input) => input.addEventListener("paste", handlePaste));

        return () => {
            document.removeEventListener("contextmenu", handleContext);
            inputs.forEach((input) =>
                input.removeEventListener("paste", handlePaste),
            );
        };
    }, []);

    if (!mounted) return null;

    return (
        <GuestLayout>
            <style jsx>{`
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>

            {showLoader && (
                <div className="fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-500">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500 font-semibold">
                            Preparing AgriShop...
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
                    {/* LEFT PANEL */}
                    <div className="bg-[#1f4d1f] p-10 flex flex-col justify-between min-h-[580px] text-white">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#4caf50] rounded-lg flex items-center justify-center font-bold">
                                    🌿
                                </div>
                                <span className="font-extrabold text-xl">
                                    Agri
                                    <span className="text-[#4caf50]">Shop</span>
                                </span>
                            </div>

                            <span className="inline-block bg-green-900/40 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                HINOBAAN EXCLUSIVE
                            </span>

                            <h2 className="font-extrabold text-2xl mb-3">
                                Join the CPSU-BSAB Marketplace
                            </h2>

                            <p className="text-white/70 text-sm mb-7">
                                Register and get access to uniforms, seeds,
                                tools, and exclusive student pricing.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">
                                        📍
                                    </div>
                                    <p className="text-sm">
                                        Hinobaan Campus Only
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">
                                        ⭐
                                    </div>
                                    <p className="text-sm">
                                        Student-only discounts
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">
                                        🛒
                                    </div>
                                    <p className="text-sm">
                                        All agri essentials in one place
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-white/40 text-xs">
                            CPSU-BSAB AgriShop
                        </p>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="bg-white p-10">
                        <div className="mb-6">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Register to access AgriShop
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="Juan Dela Cruz"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="you@cpsu.edu.ph"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="09123456789"
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {processing
                                    ? "Creating account..."
                                    : "Register to AgriShop"}
                            </button>

                            <p className="text-center text-xs text-gray-400">
                                Already registered?{" "}
                                <Link
                                    href="/login"
                                    className="text-green-600 font-semibold hover:underline"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
