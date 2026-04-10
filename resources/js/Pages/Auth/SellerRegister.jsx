import { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function SellerRegister() {
    const { props } = usePage();
    const [showLoader, setShowLoader] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        store_name: "",
        store_slug: "",
        business_license: null,
        tax_id: "",
        bank_account_name: "",
        bank_account_number: "",
        bank_name: "",
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
        post(route("register.seller"));
    };

    const handleSlugChange = (storeName) => {
        const slug = storeName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        setData("store_slug", slug);
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
                        <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-500 font-semibold">
                            Setting up Seller Account...
                        </p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#1f4d1f] to-green-700 p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-[#4caf50] rounded-xl flex items-center justify-center font-bold text-lg">
                                🛒
                            </div>
                            <div>
                                <h1 className="text-2xl font-black">
                                    Seller Registration
                                </h1>
                                <p className="text-green-100 text-sm">
                                    Join as AgriShop Seller - Hinobaan Campus
                                </p>
                            </div>
                        </div>
                        <p className="text-green-100">
                            Complete all fields to start selling agri products
                            to BSAB students
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
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                    placeholder="you@cpsu.edu.ph"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Store Info */}
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    🏪 Store Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Store Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.store_name}
                                            onChange={(e) => {
                                                setData(
                                                    "store_name",
                                                    e.target.value,
                                                );
                                                handleSlugChange(
                                                    e.target.value,
                                                );
                                            }}
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                                            placeholder="Hinobaan Seeds Co."
                                            required
                                        />
                                        {errors.store_name && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.store_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Store Slug (URL) *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.store_slug}
                                            onChange={(e) =>
                                                setData(
                                                    "store_slug",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                                            placeholder="hinobaan-seeds"
                                            required
                                        />
                                        {errors.store_slug && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.store_slug}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Business License *
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={(e) =>
                                            setData(
                                                "business_license",
                                                e.target.files[0],
                                            )
                                        }
                                        className="w-full border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 text-center text-sm text-gray-500 hover:border-green-400 hover:bg-green-50 transition"
                                    />
                                    {errors.business_license && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.business_license}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Tax ID / Business Permit *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tax_id}
                                        onChange={(e) =>
                                            setData("tax_id", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                                        placeholder="123-456-789"
                                    />
                                    {errors.tax_id && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.tax_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bank Info */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    🏦 Bank Account for Payouts
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            Account Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.bank_account_name}
                                            onChange={(e) =>
                                                setData(
                                                    "bank_account_name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                            placeholder="Juan Dela Cruz"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            Account Number
                                        </label>
                                        <input
                                            type="text"
                                            value={data.bank_account_number}
                                            onChange={(e) =>
                                                setData(
                                                    "bank_account_number",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                            placeholder="1234567890"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">
                                            Bank Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.bank_name}
                                            onChange={(e) =>
                                                setData(
                                                    "bank_name",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                            placeholder="Landbank"
                                            required
                                        />
                                    </div>
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
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-200 flex items-center justify-center"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Seller Account...
                                    </>
                                ) : (
                                    "🚀 Start Selling on AgriShop"
                                )}
                            </button>

                            <div className="text-center pt-4">
                                <p className="text-xs text-gray-500">
                                    Already have account?{" "}
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/login")
                                        }
                                        className="text-green-600 font-bold hover:underline"
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
