import React from "react";
import { Link } from "@inertiajs/react";
import { PackageCheck, Clock, Truck, MapPin } from "lucide-react";

export default function OrderCard({ order }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "shipped":
                return <Truck className="w-5 h-5 text-blue-500" />;
            case "delivered":
                return <PackageCheck className="w-5 h-5 text-green-500" />;
            default:
                return <Clock className="w-5 h-5 text-gray-400" />;
        }
    };

    return (
        <Link
            href={`/seller/orders/${order.id}`}
            className="block p-6 bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                        {getStatusIcon(order.status)}
                        <span className="font-semibold text-sm capitalize">
                            {order.status}
                        </span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                        #{order.id}
                    </span>
                </div>
                <span className="text-2xl font-bold text-green-700">
                    ₱{order.total.toLocaleString()}
                </span>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="font-medium">{order.buyer.name}</span>
                    <span className="text-gray-500">• {order.created_at}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {order.items.slice(0, 2).map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                        >
                            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                    {item.product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Qty: {item.quantity} • ₱{item.price}
                                </p>
                            </div>
                        </div>
                    ))}
                    {order.items.length > 2 && (
                        <div className="col-span-2 p-2 text-center text-sm text-gray-500 bg-gray-50 rounded-lg">
                            +{order.items.length - 2} more items
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        Items: {order.items.length}
                    </span>
                    <Link
                        href={`/seller/orders/${order.id}`}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                    >
                        View Details
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
            </div>
        </Link>
    );
}
