import React from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head } from "@inertiajs/react";
import StatsCards from "@/Components/Admin/StatsCards";
import OrderCard from "@/Components/Seller/OrderCard";
import ProductCard from "@/Components/Common/ProductCard";
import Loader from "@/Components/Common/Loader";
import { DollarSign, TrendingUp, Package, Users, Star } from "lucide-react";

export default function SellerDashboard({
    stats = {},
    recentOrders = [],
    topProducts = [],
    recentReviews = [],
}) {
    return (
        <SellerLayout>
            <Head title="Seller Dashboard" />

            <div className="space-y-10">
                {/* Stats Overview */}
                <StatsCards stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            Recent Orders
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                                {stats.new_orders_today || 0} today
                            </span>
                        </h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {recentOrders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">
                            Top Products
                        </h2>
                        <div className="space-y-4">
                            {topProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg line-clamp-1 mb-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-yellow-400 -space-x-1">
                                                <Star
                                                    fill="currentColor"
                                                    size={16}
                                                />
                                                <Star
                                                    fill="currentColor"
                                                    size={16}
                                                />
                                                <Star
                                                    fill="currentColor"
                                                    size={16}
                                                />
                                                <Star
                                                    fill="currentColor"
                                                    size={16}
                                                />
                                                <Star size={16} />
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                (124)
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-green-700 mb-1">
                                            ₱{product.price}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Sold: {product.sales}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Reviews */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentReviews.map((review) => (
                            <div
                                key={review.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center font-bold text-orange-600">
                                        {review.buyer.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 line-clamp-1">
                                            {review.buyer.name}
                                        </h4>
                                        <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={
                                                        i < review.rating
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                review.created_at,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700 line-clamp-3">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href="/seller/products/create"
                        className="group bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
                    >
                        <Plus
                            size={48}
                            className="mx-auto mb-6 group-hover:scale-110 transition-transform"
                        />
                        <h3 className="text-2xl font-bold mb-2">
                            Add New Product
                        </h3>
                        <p className="text-green-100">
                            List your agri products
                        </p>
                    </Link>

                    <Link
                        href="/seller/products"
                        className="group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
                    >
                        <Package
                            size={48}
                            className="mx-auto mb-6 group-hover:scale-110 transition-transform"
                        />
                        <h3 className="text-2xl font-bold mb-2">
                            Manage Products
                        </h3>
                        <p className="text-blue-100">View & edit listings</p>
                    </Link>

                    <Link
                        href="/seller/payouts"
                        className="group bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
                    >
                        <DollarSign
                            size={48}
                            className="mx-auto mb-6 group-hover:scale-110 transition-transform"
                        />
                        <h3 className="text-2xl font-bold mb-2">Payouts</h3>
                        <p className="text-purple-100">View earnings</p>
                    </Link>
                </div>
            </div>
        </SellerLayout>
    );
}
