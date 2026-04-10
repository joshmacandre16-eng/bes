import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import CartItem from "@/Components/Buyer/CartItem";
import Loader from "@/Components/Common/Loader";
import { ShoppingCart, CreditCard, Truck, CheckCircle } from "lucide-react";

export default function CartIndex({
    cartItems = [],
    subtotal = 0,
    taxes = 0,
    total = 0,
}) {
    const [items, setItems] = useState(cartItems);

    const updateQuantity = (item, newQty) => {
        if (newQty < 1) return removeItem(item);
        setItems(
            items.map((i) =>
                i.id === item.id ? { ...i, quantity: newQty } : i,
            ),
        );
    };

    const removeItem = (item) => {
        setItems(items.filter((i) => i.id !== item.id));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <BuyerLayout title="Shopping Cart">
            <Head title="Cart" />

            <div className="space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            Shopping Cart
                        </h1>
                        <p className="text-xl text-gray-600">
                            {items.length} items in your cart
                        </p>
                    </div>
                    {items.length > 0 && (
                        <Link
                            href="/buyer/checkout"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition flex items-center gap-3"
                        >
                            <ShoppingCart size={20} />
                            Proceed to Checkout
                        </Link>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-32">
                        <div className="w-32 h-32 mx-auto mb-8 p-8 bg-gray-100 rounded-3xl flex items-center justify-center">
                            <ShoppingCart className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Your cart is empty
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            No items added yet. Start shopping!
                        </p>
                        <Link
                            href="/buyer/products"
                            className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-700 transition shadow-xl hover:shadow-2xl"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M4.4 5l1.5-1.5M20.6 5l-1.5-1.5M21 13a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQty={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:max-w-md mx-auto lg:ml-auto">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky bottom-0">
                                <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">
                                    Order Summary
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-lg">
                                        <span>
                                            Subtotal ({items.length} items)
                                        </span>
                                        <span className="font-bold">
                                            ₱{subtotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg">
                                        <span>Taxes & Fees</span>
                                        <span className="font-bold text-green-600">
                                            ₱{taxes.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="h-px bg-gray-200" />
                                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₱{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8 text-sm text-gray-600">
                                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span>
                                            Free delivery on orders over ₱500
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                        <span>
                                            Delivery within 24hrs (Campus only)
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href="/buyer/checkout"
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all block text-center flex items-center justify-center gap-3 mx-auto"
                                >
                                    <CreditCard size={22} />
                                    Proceed to Checkout ₱
                                    {total.toLocaleString()}
                                </Link>

                                <button
                                    onClick={clearCart}
                                    className="w-full mt-4 text-gray-600 hover:text-gray-900 font-semibold py-3 px-4 rounded-2xl hover:bg-gray-50 transition text-center border border-gray-200"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </BuyerLayout>
    );
}
