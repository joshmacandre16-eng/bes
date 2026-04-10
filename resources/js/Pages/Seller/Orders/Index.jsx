import React, { useState } from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head } from "@inertiajs/react";
import OrderCard from "@/Components/Seller/OrderCard";
import Loader from "@/Components/Common/Loader";

export default function SellerOrdersIndex({ orders = [] }) {
    const [tab, setTab] = useState("all");

    const filteredOrders = orders.filter(
        (order) => tab === "all" || order.status === tab,
    );

    return (
        <SellerLayout title="Orders">
            <Head title="Orders" />

            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

                {/* Tab */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-1">
                    <div className="flex bg-white rounded-3xl -m-1">
                        <button
                            onClick={() => setTab("all")}
                            className={`flex-1 py-4 px-6 font-bold rounded-3xl transition ${tab === "all" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            All ({orders.length})
                        </button>
                        <button
                            onClick={() => setTab("pending")}
                            className={`flex-1 py-4 px-6 font-bold rounded-3xl transition ${tab === "pending" ? "bg-yellow-500 text-white shadow-lg" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            Pending (
                            {
                                orders.filter((o) => o.status === "pending")
                                    .length
                            }
                            )
                        </button>
                        <button
                            onClick={() => setTab("shipped")}
                            className={`flex-1 py-4 px-6 font-bold rounded-3xl transition ${tab === "shipped" ? "bg-blue-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            Shipped (
                            {
                                orders.filter((o) => o.status === "shipped")
                                    .length
                            }
                            )
                        </button>
                        <button
                            onClick={() => setTab("delivered")}
                            className={`flex-1 py-4 px-6 font-bold rounded-3xl transition ${tab === "delivered" ? "bg-green-600 text-white shadow-lg" : "text-gray-700 hover:bg-gray-50"}`}
                        >
                            Delivered (
                            {
                                orders.filter((o) => o.status === "delivered")
                                    .length
                            }
                            )
                        </button>
                    </div>
                </div>

                <div className="grid gap-6">
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </div>
            </div>
        </SellerLayout>
    );
}
