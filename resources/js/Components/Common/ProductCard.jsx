import React from "react";
import { Link } from "@inertiajs/react";
import { Star } from "lucide-react";
import RatingStars from "@/Components/Buyer/RatingStars"; // Forward ref

const ProductCard = ({ product }) => {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 h-full flex flex-col"
        >
            {/* Image */}
            <div className="w-full h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-300">
                <img
                    src={product.image || "/placeholder-product.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.new && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        New
                    </span>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                    <RatingStars rating={product.rating || 4.5} />
                    <span className="ml-2 text-sm text-gray-500">
                        ({product.reviews || 23})
                    </span>
                </div>

                {/* Price & Seller */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-2xl font-bold text-green-700">
                            ₱{product.price}
                        </span>
                        {product.original_price && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                                ₱{product.original_price}
                            </span>
                        )}
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {product.seller_name}
                    </span>
                </div>

                {/* Action */}
                <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;
