import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import OrderTimeline from "@/Components/Buyer/OrderTimeline";
import Loader from "@/Components/Common/Loader";
import { Package, Clock, CheckCircle, RefreshCw } from "lucide-react";

export default function OrdersIndex({ orders = [] }) {
    const [activeTab, setActiveTab] = useState("all");
    const tabs = [
        { id: "all", label: "All Orders", count: orders.length },
        {
            id: "pending",
            label: "Pending",
            count: orders.filter((o) => o.status === "pending").length,
        },
        {
            id: "delivered",
            label: "Delivered",
            count: orders.filter((o) => o.status === "delivered").length,
        },
        {
            id: "cancelled",
            label: "Cancelled",
            count: orders.filter((o) => o.status === "cancelled").length,
        },
    ];

    const filteredOrders = orders.filter(
        (order) => activeTab === "all" || order.status === activeTab,
    );

    return (
        <BuyerLayout title="Orders">
            <Head title="Orders" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Your Orders
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{orders.length} total orders</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-4 px-6 font-semibold text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? "border-b-2 border-green-600 text-green-700 bg-green-50"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                {tab.label}{" "}
                                <span className="ml-1 bg-gray-200 px-2 py-0.5 rounded-full text-xs">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20">
                            <Package className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                No orders found
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Start shopping to track your orders!
                            </p>
                            <Link
                                href="/buyer/products"
                                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition"
                            >
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={`/buyer/orders/${order.id}`}
                                    className="p-8 hover:bg-gray-50 transition block"
                                >
                                    <div className="flex items-start gap-6 lg:gap-12">
                                        {/* Order Status */}
                                        <div className="flex-shrink-0">
                                            <div
                                                className={`w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg ${order.status === "delivered" ? "bg-green-100 text-green-800 border-4 border-green-200" : order.status === "pending" ? "bg-yellow-100 text-yellow-800 border-4 border-yellow-200" : "bg-gray-100 text-gray-800 border-4 border-gray-200"}`}
                                            >
                                                {order.status ===
                                                "delivered" ? (
                                                    <CheckCircle size={32} />
                                                ) : order.status ===
                                                  "pending" ? (
                                                    <Clock size={32} />
                                                ) : (
                                                    <Package size={32} />
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">
                                                        Order #{order.id}
                                                    </h3>
                                                    <p className="text-2xl font-bold text-green-700 mb-1">
                                                        ₱
                                                        {order.total.toLocaleString()}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(
                                                            order.created_at,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${
                                                        order.status ===
                                                        "delivered"
                                                            ? "bg-green-100 text-green-800"
                                                            : order.status ===
                                                                "pending"
                                                              ? "bg-yellow-100 text-yellow-800"
                                                              : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>

                                            {/* Items Preview */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                                {order.items
                                                    .slice(0, 3)
                                                    .map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="group flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-white transition"
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
                                                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                                            />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="font-semibold text-sm line-clamp-1 group-hover:text-green-700">
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    Qty:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                {order.items.length > 3 && (
                                                    <div className="col-span-full text-center py-3 text-sm text-gray-500 bg-gray-100 rounded-xl">
                                                        +
                                                        {order.items.length - 3}{" "}
                                                        more items
                                                    </div>
                                                )}
                                            </div>

                                            {/* Timeline Preview */}
                                            <OrderTimeline order={order} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </BuyerLayout>
    );
}
