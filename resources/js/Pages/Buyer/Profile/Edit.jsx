import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import Loader from "@/Components/Common/Loader";
import { User, Phone, MapPin, Camera } from "lucide-react";

export default function ProfileEdit({ user }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.buyer_profile?.address || "",
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("buyer.profile.update"));
    };

    return (
        <BuyerLayout title="Profile Settings">
            <Head title="Profile" />

            <div className="max-w-2xl space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl mx-auto overflow-hidden">
                                {data.avatar ? (
                                    <img
                                        src={URL.createObjectURL(data.avatar)}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    data.name.charAt(0).toUpperCase()
                                )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 bg-green-600 p-4 rounded-3xl shadow-2xl cursor-pointer hover:bg-green-700 transition hover:scale-110 hover:shadow-3xl">
                                <Camera size={20} className="text-white" />
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setData("avatar", e.target.files[0])
                                    }
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {data.name}
                        </h2>
                        <p className="text-xl text-gray-600">
                            CPSU Student - Buyer
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                                <User size={20} className="text-green-600" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full p-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-lg"
                                required
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full p-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-lg"
                                required
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                            <Phone size={20} className="text-green-600" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full p-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-lg"
                            placeholder="09123456789"
                        />
                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                            <MapPin size={20} className="text-green-600" />
                            Default Delivery Address
                        </label>
                        <textarea
                            rows="4"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full p-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-lg resize-vertical"
                            placeholder="Building 7, Room 302, Hinobaan Campus..."
                        />
                        {errors.address && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.address}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={reset}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-8 rounded-2xl font-bold text-lg transition"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {processing ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Profile"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </BuyerLayout>
    );
}
