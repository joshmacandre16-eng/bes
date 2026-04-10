import React from "react";
import { Link } from "@inertiajs/react";
import RatingStars from "./RatingStars";
import { Trash2, Minus, Plus } from "lucide-react";

export default function CartItem({ item, onUpdateQty, onRemove }) {
    return (
        <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <Link
                    href={`/products/${item.product.id}`}
                    className="block font-semibold text-gray-900 hover:text-green-700 line-clamp-2 mb-1"
                >
                    {item.product.name}
                </Link>
                <div className="flex items-center gap-2 mb-2">
                    <RatingStars rating={item.product.rating} size={14} />
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.product.description}
                </p>
                <div className="text-2xl font-bold text-green-700 mb-3">
                    ₱{(item.product.price * item.quantity).toLocaleString()}
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                        <button
                            onClick={() => onUpdateQty(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-50"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="mx-2 font-semibold w-8 text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQty(item, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-green-600"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
