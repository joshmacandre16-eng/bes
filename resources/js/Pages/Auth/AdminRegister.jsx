import { useState, useEffect, Link } from "react";
import { useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function AdminRegister() {
    const [showLoader, setShowLoader] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
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
        post(route("register.admin"));
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
                        <div className="w-12 h-12 border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500 font-semibold">
                            Preparing Admin Panel...
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
                    {/* LEFT PANEL */}
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-10 flex flex-col justify-between min-h-[580px] text-white">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-indigo-400 rounded-lg flex items-center justify-center font-bold">
                                    🛡️
                                </div>
                                <span className="font-extrabold text-xl">
                                    Agri
                                    <span className="text-indigo-300">
                                        Admin
                                    </span>
                                </span>
                            </div>

                            <span className="inline-block bg-indigo-400/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                ADMIN ACCESS
                            </span>

                            <h2 className="font-extrabold text-2xl mb-3">
                                Platform Administration
                            </h2>

                            <p className="text-white/80 text-sm mb-7">
                                Register to manage users, sellers, disputes, and
                                platform settings.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                                        👥
                                    </div>
                                    <p className="text-sm">User Management</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                                        📊
                                    </div>
                                    <p className="text-sm">
                                        Analytics & Reports
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center">
                                        ⚙️
                                    </div>
                                    <p className="text-sm">System Settings</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-white/50 text-xs">
                            AgriShop Admin Portal
                        </p>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="bg-white p-10">
                        <div className="mb-6">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                                Admin Registration
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Create your admin account
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    placeholder="Admin Full Name"
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    placeholder="admin@cpsu.edu.ph"
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
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
                                    Position
                                </label>
                                <input
                                    type="text"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData("position", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    placeholder="e.g., Platform Manager"
                                    required
                                />
                                {errors.position && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.position}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    value={data.department}
                                    onChange={(e) =>
                                        setData("department", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    placeholder="e.g., IT Department"
                                    required
                                />
                                {errors.department && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.department}
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-bold text-sm transition-colors disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {processing
                                    ? "Creating admin account..."
                                    : "Register Admin Account"}
                            </button>

                            <p className="text-center text-xs text-gray-400">
                                Already have account?{" "}
                                <Link
                                    href="/login"
                                    className="text-indigo-600 font-semibold hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
