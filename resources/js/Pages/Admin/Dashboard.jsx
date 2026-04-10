import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import StatsCards from "@/Components/Admin/StatsCards";
import UserTable from "@/Components/Admin/UserTable";
import Loader from "@/Components/Common/Loader";

export default function AdminDashboard({
    stats = {},
    recentUsers = [],
    recentOrders = [],
    recentSellers = [],
}) {
    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="space-y-10">
                {/* Stats */}
                <StatsCards stats={stats} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-orange-50">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                Recent Users
                            </h2>
                        </div>
                        <UserTable users={recentUsers.slice(0, 6)} />
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Recent Orders
                        </h2>
                        <div className="space-y-4">
                            {recentOrders.slice(0, 5).map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white transition"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-bold text-blue-700">
                                        #{order.id % 100}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 line-clamp-1">
                                            {order.buyer_name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Order #{order.id}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-green-700">
                                            ₱{order.total}
                                        </p>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
