import React from "react";
import CourierLayout from "@/Layouts/CourierLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";
import { Truck, Package, MapPin, Clock, CheckCircle } from "lucide-react";

export default function CourierDashboard({
    stats = {},
    activeTasks = [],
    recentHistory = [],
}) {
    return (
        <CourierLayout>
            <Head title="Courier Dashboard" />

            <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-blue-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <Truck className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Active Tasks
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.active_tasks || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-green-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completed Today
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.completed_today || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-orange-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Pending Pickup
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {stats.pending_pickup || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-lg border border-purple-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total Earnings
                                </p>
                                <p className="text-3xl font-bold text-gray-900">
                                    ₱{stats.earnings?.toLocaleString() || "0"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Active Tasks */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            Active Tasks
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                                {activeTasks.length} tasks
                            </span>
                        </h2>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {activeTasks.map((task) => (
                                <Link
                                    key={task.id}
                                    href={`/courier/tasks/${task.id}`}
                                    className="block p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition border border-blue-200 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${task.status === "pending" ? "bg-yellow-500" : "bg-green-500"}`}
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-bold text-lg">
                                                    Order #{task.order_id}
                                                </h3>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                                                    {task.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3">
                                                Pick up from {task.seller_name}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={16} />
                                                    <span>
                                                        {task.pickup_location}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={16} />
                                                    <span>
                                                        {task.distance} km
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-2xl text-green-700">
                                                ₱{task.earning}
                                            </p>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">
                                                delivery fee
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent History */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">
                            Recent History
                        </h2>
                        <div className="space-y-4">
                            {recentHistory.slice(0, 5).map((delivery) => (
                                <div
                                    key={delivery.id}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-white transition"
                                >
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">
                                            Order #{delivery.order_id}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {delivery.buyer_name}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600 text-right">
                                        <p className="font-semibold">
                                            ₱{delivery.earning}
                                        </p>
                                        <p className="text-xs">
                                            {new Date(
                                                delivery.completed_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        href="/courier/tasks"
                        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-blue-100 hover:border-blue-200 transition-all hover:-translate-y-2 text-center"
                    >
                        <Truck className="w-16 h-16 mx-auto mb-6 text-blue-600 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Available Tasks
                        </h3>
                        <p className="text-gray-600">Accept new deliveries</p>
                    </Link>
                    <Link
                        href="/courier/scan"
                        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-green-100 hover:border-green-200 transition-all hover:-translate-y-2 text-center"
                    >
                        <svg
                            className="w-16 h-16 mx-auto mb-6 text-green-600 group-hover:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            QR Scanner
                        </h3>
                        <p className="text-gray-600">Scan packages</p>
                    </Link>
                    <Link
                        href="/courier/history"
                        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-purple-100 hover:border-purple-200 transition-all hover:-translate-y-2 text-center"
                    >
                        <Clock className="w-16 h-16 mx-auto mb-6 text-purple-600 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Delivery History
                        </h3>
                        <p className="text-gray-600">View past deliveries</p>
                    </Link>
                </div>
            </div>
        </CourierLayout>
    );
}
