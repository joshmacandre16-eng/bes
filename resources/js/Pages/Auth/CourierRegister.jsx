import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function CourierRegister() {
    const [showLoader, setShowLoader] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        full_name: "",
        national_id: "",
        driver_license: "",
        vehicle_type: "motorcycle",
        vehicle_plate: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setShowLoader(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register.courier"));
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
                <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500 font-semibold">
                            Setting up Courier Account...
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">
                                🚚
                            </div>
                            <div>
                                <h1 className="text-2xl font-black">
                                    Courier Registration
                                </h1>
                                <p className="text-blue-100 text-sm">
                                    Join AgriShop Delivery Team - Fast &
                                    Reliable
                                </p>
                            </div>
                        </div>
                        <p className="text-blue-100">
                            Deliver agri products across Hinobaan campus
                            efficiently
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Personal Info */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="09123456789"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    CPSU Email *
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder="you@cpsu.edu.ph"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Courier Info */}
                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    🚀 Delivery Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Full Legal Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) =>
                                                setData(
                                                    "full_name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                            placeholder="Juan Dela Cruz"
                                            required
                                        />
                                        {errors.full_name && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.full_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            National ID *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.national_id}
                                            onChange={(e) =>
                                                setData(
                                                    "national_id",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                            placeholder="ID123456789"
                                            required
                                        />
                                        {errors.national_id && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.national_id}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Driver's License *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.driver_license}
                                            onChange={(e) =>
                                                setData(
                                                    "driver_license",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                            placeholder="DLN-1234567"
                                            required
                                        />
                                        {errors.driver_license && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.driver_license}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Vehicle Type *
                                        </label>
                                        <select
                                            value={data.vehicle_type}
                                            onChange={(e) =>
                                                setData(
                                                    "vehicle_type",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        >
                                            <option value="motorcycle">
                                                Motorcycle
                                            </option>
                                            <option value="car">Car</option>
                                            <option value="bicycle">
                                                Bicycle
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Vehicle Plate Number *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.vehicle_plate}
                                        onChange={(e) =>
                                            setData(
                                                "vehicle_plate",
                                                e.target.value.toUpperCase(),
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition uppercase tracking-wider font-mono"
                                        placeholder="ABC 123"
                                        required
                                    />
                                    {errors.vehicle_plate && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.vehicle_plate}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Confirm Password *
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
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 flex items-center justify-center"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Courier Account...
                                    </>
                                ) : (
                                    "🚚 Join AgriShop Delivery Team"
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-xs text-gray-500">
                                    Already registered?{" "}
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/login")
                                        }
                                        className="text-blue-600 font-bold hover:underline"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
