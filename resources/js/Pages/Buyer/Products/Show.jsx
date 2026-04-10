import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import ProductCard from "@/Components/Common/ProductCard";
import RatingStars from "@/Components/Buyer/RatingStars";
import Loader from "@/Components/Common/Loader";
import { ShoppingCart, Heart, Share2, Minus, Plus, Star } from "lucide-react";

export default function ProductShow({
    product,
    relatedProducts = [],
    reviews = [],
}) {
    const [quantity, setQuantity] = useState(1);
    const [inCart, setInCart] = useState(false);

    const addToCart = () => {
        // Simulate add to cart
        setInCart(true);
        setTimeout(() => setInCart(false), 2000);
    };

    return (
        <BuyerLayout title={product.name}>
            <Head title={product.name} />

            <div className="space-y-12">
                {/* Product Main */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 aspect-video max-h-[500px] shadow-xl">
                            <img
                                src={product.images[0] || "/placeholder.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.slice(1, 5).map((img, index) => (
                                <div
                                    key={index}
                                    className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-green-500 transition"
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    In Stock
                                </span>
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    23 sold
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-6">
                                <RatingStars rating={product.rating} />
                                <span className="text-gray-600">
                                    ({product.reviews_count})
                                </span>
                            </div>
                            <div className="text-5xl font-bold text-green-700 mb-6">
                                ₱{product.price}
                            </div>
                            {product.original_price && (
                                <div className="text-2xl text-gray-400 line-through mb-8">
                                    ₱{product.original_price}
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <h3 className="font-bold text-lg mb-4">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-white border border-gray-300 rounded-xl px-4 py-2">
                                    <button
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1),
                                            )
                                        }
                                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-xl mx-4">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <span className="text-lg text-gray-600">
                                    Available: {product.stock}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={addToCart}
                                disabled={inCart}
                                className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 justify-center"
                            >
                                {inCart ? (
                                    <>
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={24} />
                                        Add to Cart
                                    </>
                                )}
                            </button>

                            <button className="border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:text-green-700 py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3 justify-center group">
                                <Heart
                                    size={24}
                                    className="group-hover:fill-green-500 group-hover:stroke-green-500"
                                />
                                Add to Wishlist
                            </button>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t">
                            <Share2 size={20} className="text-gray-400" />
                            <span className="text-sm text-gray-500">
                                Share this product
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description & Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6">
                                Description
                            </h2>
                            <div className="prose max-w-none text-gray-700 leading-relaxed">
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">
                                Product Details
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Category
                                    </span>
                                    <span className="font-semibold">
                                        {product.category?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Seller
                                    </span>
                                    <span className="font-semibold text-green-700">
                                        {product.seller_name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Stock</span>
                                    <span
                                        className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                                    >
                                        {product.stock > 0
                                            ? `${product.stock} available`
                                            : "Out of stock"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Rating
                                    </span>
                                    <RatingStars rating={product.rating} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex-1">
                            Reviews ({reviews.length})
                        </h2>
                        <div className="flex items-center gap-2">
                            <RatingStars rating={product.rating} />
                            <span className="text-lg font-bold">
                                {product.rating}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.slice(0, 6).map((review) => (
                            <div
                                key={review.id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
                                        {review.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">
                                            {review.user.name}
                                        </h4>
                                        <RatingStars
                                            rating={review.rating}
                                            size={14}
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    {review.comment}
                                </p>
                                <p className="text-sm text-gray-500 mt-3">
                                    {new Date(
                                        review.created_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-8">
                            You might also like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((related) => (
                                <ProductCard
                                    key={related.id}
                                    product={related}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </BuyerLayout>
    );
}
