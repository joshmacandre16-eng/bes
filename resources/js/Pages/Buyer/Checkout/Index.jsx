import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import Loader from "@/Components/Common/Loader";
import { CreditCard, MapPin, PackageCheck } from "lucide-react";

export default function CheckoutIndex({
    cartItems = [],
    subtotal = 0,
    total = 0,
    vouchers = [],
}) {
    const [step, setStep] = useState(1);
    const [orderData, setOrderData] = useState({
        address: "",
        payment_method: "cod",
        voucher_code: "",
    });

    const applyVoucher = () => {
        // Simulate voucher apply
    };

    const placeOrder = () => {
        router.post("/buyer/checkout", orderData);
    };

    return (
        <BuyerLayout title="Checkout">
            <Head title="Checkout" />

            <div className="max-w-6xl mx-auto space-y-12">
                {/* Steps */}
                <div className="flex items-center justify-center gap-8">
                    <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${step >= 1 ? "bg-green-50 text-green-800 border-2 border-green-200" : "bg-gray-100 text-gray-500"}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${step >= 1 ? "bg-green-600 text-white" : "bg-gray-300"}`}
                        >
                            1
                        </div>
                        <span>Address</span>
                    </div>
                    <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${step >= 2 ? "bg-green-50 text-green-800 border-2 border-green-200" : "bg-gray-100 text-gray-500"}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${step >= 2 ? "bg-green-600 text-white" : "bg-gray-300"}`}
                        >
                            2
                        </div>
                        <span>Payment</span>
                    </div>
                    <div
                        className={`flex items-center gap-3 p-4 rounded-2xl ${step >= 3 ? "bg-green-50 text-green-800 border-2 border-green-200" : "bg-gray-100 text-gray-500"}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${step >= 3 ? "bg-green-600 text-white" : "bg-gray-300"}`}
                        >
                            3
                        </div>
                        <span>Review</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">
                    {/* Left Column - Form */}
                    <div className="space-y-8">
                        {step === 1 && (
                            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6">
                                    Delivery Address
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                                            <MapPin
                                                size={20}
                                                className="text-green-600"
                                            />
                                            Campus Delivery Address
                                        </label>
                                        <textarea
                                            value={orderData.address}
                                            onChange={(e) =>
                                                setOrderData({
                                                    ...orderData,
                                                    address: e.target.value,
                                                })
                                            }
                                            rows="4"
                                            className="w-full p-5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none text-lg"
                                            placeholder="Enter your Hinobaan campus address (Building, Room #, etc.)"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!orderData.address}
                                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition disabled:cursor-not-allowed flex items-center gap-3 justify-center"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                                <h2 className="text-2xl font-bold mb-8">
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            id="cod"
                                            value="cod"
                                            checked
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="cod"
                                            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-3xl hover:border-green-400 hover:shadow-md transition cursor-pointer flex items-center gap-4"
                                        >
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                                <CreditCard size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">
                                                    Cash on Delivery
                                                </h3>
                                                <p className="text-gray-600">
                                                    Pay when delivered (Campus
                                                    only)
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Voucher */}
                                    <div>
                                        <label className="block text-sm font-bold mb-3">
                                            Voucher Code
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={orderData.voucher_code}
                                                onChange={(e) =>
                                                    setOrderData({
                                                        ...orderData,
                                                        voucher_code:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Enter voucher code"
                                                className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={applyVoucher}
                                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold whitespace-nowrap transition"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-6 rounded-2xl font-bold transition"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:shadow-xl transition"
                                        >
                                            Review Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                                <h2 className="text-2xl font-bold mb-8 text-center">
                                    Order Review
                                </h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-bold text-lg mb-4">
                                                Items ({cartItems.length})
                                            </h3>
                                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                                {cartItems
                                                    .slice(0, 3)
                                                    .map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                                                        >
                                                            <img
                                                                src={
                                                                    item.product
                                                                        .image
                                                                }
                                                                alt={
                                                                    item.product
                                                                        .name
                                                                }
                                                                className="w-16 h-16 rounded-lg object-cover"
                                                            />
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-semibold text-sm line-clamp-1">
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Qty:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>
                                                            </div>
                                                            <span className="font-bold text-green-700">
                                                                ₱
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-4">
                                                Summary
                                            </h3>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span>Subtotal</span>
                                                    <span>
                                                        ₱
                                                        {subtotal.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Delivery</span>
                                                    <span className="text-green-600">
                                                        FREE
                                                    </span>
                                                </div>
                                                <div className="h-px bg-gray-200" />
                                                <div className="flex justify-between text-xl font-bold">
                                                    <span>Total</span>
                                                    <span>
                                                        ₱
                                                        {total.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={placeOrder}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 px-8 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 justify-center"
                                    >
                                        <PackageCheck size={24} />
                                        Place Order - ₱{total.toLocaleString()}
                                    </button>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 px-8 rounded-2xl font-bold transition"
                                    >
                                        Back to Payment
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:max-w-md">
                        <div className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-3xl p-8 shadow-2xl border border-green-200 sticky top-24">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <Truck className="w-6 h-6 text-green-600" />
                                Delivery Info
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <span className="font-semibold">
                                        Estimated Delivery:
                                    </span>
                                    <p>Tomorrow, 10AM-12PM</p>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Delivery Fee:
                                    </span>
                                    <p className="text-green-600 font-bold">
                                        FREE
                                    </p>
                                </div>
                                <div>
                                    <span className="font-semibold">
                                        Payment:
                                    </span>
                                    <p>Cash on Delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BuyerLayout>
    );
}
