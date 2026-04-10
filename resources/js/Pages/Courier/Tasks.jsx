import React, { useState } from "react";
import CourierLayout from "@/Layouts/CourierLayout";
import { Head, Link } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";
import { MapPin, Clock, Package, CheckCircle, Truck } from "lucide-react";

export default function CourierTasks({
    availableTasks = [],
    assignedTasks = [],
}) {
    const [tab, setTab] = useState("available");

    return (
        <CourierLayout title="Tasks">
            <Head title="Tasks" />

            <div className="space-y-8">
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Delivery Tasks
                    </h1>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-2xl text-sm font-bold">
                            <Truck size={18} />
                            Available: {availableTasks.length}
                        </div>
                        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-2xl text-sm font-bold">
                            <Package size={18} />
                            Assigned: {assignedTasks.length}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-3xl shadow-2xl p-1">
                    <div className="flex bg-white rounded-3xl -m-1">
                        <button
                            onClick={() => setTab("available")}
                            className={`flex-1 py-5 px-8 font-bold rounded-3xl transition-all ${
                                tab === "available"
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-[1.02]"
                                    : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
                            }`}
                        >
                            Available Tasks ({availableTasks.length})
                        </button>
                        <button
                            onClick={() => setTab("assigned")}
                            className={`flex-1 py-5 px-8 font-bold rounded-3xl transition-all ${
                                tab === "assigned"
                                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-[1.02]"
                                    : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
                            }`}
                        >
                            My Assigned ({assignedTasks.length})
                        </button>
                    </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-6">
                    {(tab === "available" ? availableTasks : assignedTasks).map(
                        (task) => (
                            <Link
                                key={task.id}
                                href={`/courier/tasks/${task.id}`}
                                className={`group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border transition-all hover:-translate-y-2 hover:border-blue-300 ${
                                    tab === "available"
                                        ? "border-blue-100 hover:border-blue-300"
                                        : "border-green-100 hover:border-green-300"
                                }`}
                            >
                                <div className="flex items-start gap-6 lg:gap-8">
                                    {/* Task Icon */}
                                    <div
                                        className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                                            tab === "available"
                                                ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
                                                : "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
                                        }`}
                                    >
                                        <Package size={32} />
                                    </div>

                                    {/* Task Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-4 mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 line-clamp-1 flex-1">
                                                Order #{task.order_id}
                                            </h3>
                                            <div
                                                className={`px-4 py-2 rounded-2xl font-bold text-sm ${
                                                    task.priority === "high"
                                                        ? "bg-red-100 text-red-800"
                                                        : task.priority ===
                                                            "medium"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {task.priority}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl">
                                                <MapPin
                                                    size={20}
                                                    className="text-blue-600 flex-shrink-0"
                                                />
                                                <div>
                                                    <p className="font-semibold text-sm">
                                                        Pickup
                                                    </p>
                                                    <p className="text-sm text-gray-700 line-clamp-1">
                                                        {task.seller_name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {task.pickup_address}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl">
                                                <MapPin
                                                    size={20}
                                                    className="text-green-600 flex-shrink-0"
                                                />
                                                <div>
                                                    <p className="font-semibold text-sm">
                                                        Deliver to
                                                    </p>
                                                    <p className="text-sm text-gray-700 line-clamp-1">
                                                        {task.buyer_name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {task.delivery_address}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Distance
                                                </p>
                                                <p className="text-2xl font-bold text-blue-600">
                                                    {task.distance} km
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    Est. Time
                                                </p>
                                                <p className="text-2xl font-bold text-green-600">
                                                    {task.estimated_time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Earnings & Action */}
                                    <div className="flex flex-col items-end gap-4 mt-2 flex-shrink-0">
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-green-700 mb-1">
                                                ₱{task.earning}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                delivery fee
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {tab === "available" ? (
                                                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition transform hover:scale-105 whitespace-nowrap">
                                                    Accept Task
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`/courier/scan/${task.id}`}
                                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition transform hover:scale-105"
                                                >
                                                    Start Delivery
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </CourierLayout>
    );
}
