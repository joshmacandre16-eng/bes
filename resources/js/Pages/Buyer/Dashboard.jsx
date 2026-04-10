import React from "react";
import { Head, Link } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import ProductCard from "@/Components/Common/ProductCard";
import StatsCards from "@/Components/Admin/StatsCards"; // Reuse pattern
import Loader from "@/Components/Common/Loader";
import { ShoppingCart, TrendingUp, Star } from "lucide-react";

export default function Dashboard({
    recentProducts = [],
    stats = {},
    recommended = [],
}) {
    return (
        <BuyerLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                                <ShoppingCart className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                                    Cart Items
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.cart_items || 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                                    Total Spent
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    ₱{(stats.total_spent || 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                                <Star className="w-8 h-8 text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                                    Orders
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.orders || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Products */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Recommended for You
                        </h2>
                        <Link
                            href="/buyer/products"
                            className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                        >
                            See All{" "}
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recommended.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Recent Products */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Recently Viewed
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href="/buyer/cart"
                        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center"
                    >
                        <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-green-600 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            View Cart
                        </h3>
                        <p className="text-gray-600">Continue shopping</p>
                    </Link>
                    <Link
                        href="/buyer/orders"
                        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center"
                    >
                        <svg
                            className="w-16 h-16 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                            />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Track Orders
                        </h3>
                        <p className="text-gray-600">View order status</p>
                    </Link>
                    <Link
                        href="/buyer/products/search"
                        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 text-center"
                    >
                        <svg
                            className="w-16 h-16 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Search Products
                        </h3>
                        <p className="text-gray-600">Find agri essentials</p>
                    </Link>
                </div>
            </div>
        </BuyerLayout>
    );
}
