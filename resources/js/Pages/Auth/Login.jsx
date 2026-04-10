import { useState, useEffect, Link } from "react";
import { useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Loader from "@/Components/Common/Loader";
import GuestLayout from "@/Layouts/GuestLayout";
import Loader from "@/Components/Common/Loader";

export default function Login() {
    const [showLoader, setShowLoader] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setShowLoader(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

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
                            Welcome back to AgriShop...
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
                    {/* LEFT PANEL - Welcome back */}
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

                            <h2 className="font-extrabold text-2xl mb-3">
                                Welcome Back!
                            </h2>
                            <p className="text-white/70 text-sm mb-7">
                                Sign in to access your marketplace dashboard and
                                continue shopping or selling.
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-xl">
                                    <div className="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">
                                        🛒
                                    </div>
                                    <span>Your Orders</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded-xl">
                                    <div className="w-8 h-8 bg-green-800/40 rounded-lg flex items-center justify-center">
                                        ⭐
                                    </div>
                                    <span>Seller Dashboard</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-white/40 text-xs">
                            Secure CPSU Marketplace Login
                        </p>
                    </div>

                    {/* RIGHT PANEL - Form */}
                    <div className="bg-white p-10">
                        <div className="mb-8">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                Sign In
                            </h2>
                            <p className="text-gray-500">
                                Access your AgriShop account
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="you@cpsu.edu.ph"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-semibold text-green-600 hover:text-green-500"
                                >
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-xl font-bold text-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    "Sign In to Marketplace"
                                )}
                            </button>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{" "}
                                    <Link
                                        href="/register"
                                        className="font-semibold text-green-600 hover:text-green-700"
                                    >
                                        Register as Buyer
                                    </Link>
                                </p>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <Link
                                        href="/register/seller"
                                        className="block px-4 py-2 text-center bg-green-50 border border-green-200 rounded-lg text-sm font-semibold text-green-800 hover:bg-green-100 transition"
                                    >
                                        Become Seller
                                    </Link>
                                    <Link
                                        href="/register/admin"
                                        className="block px-4 py-2 text-center bg-indigo-50 border border-indigo-200 rounded-lg text-sm font-semibold text-indigo-800 hover:bg-indigo-100 transition"
                                    >
                                        Admin Panel
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
