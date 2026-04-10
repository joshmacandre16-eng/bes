import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import ProductCard from "@/Components/Common/ProductCard";
import Loader from "@/Components/Common/Loader";
import { Search, Filter, Grid, List } from "lucide-react";

export default function ProductsIndex({
    products = [],
    categories = [],
    filters = {},
}) {
    const [viewMode, setViewMode] = useState("grid");
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <BuyerLayout title="All Products">
            <Head title="Products" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Marketplace
                        </h1>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span>{filteredProducts.length}</span>
                            <span>products available</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search agri products..."
                                className="pl-11 pr-4 py-3 w-72 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                        </div>
                        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition">
                            <Filter className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-xl ${viewMode === "grid" ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"}`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-xl ${viewMode === "list" ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Sidebar (Desktop) */}
                <div className="grid grid-cols-4 gap-8">
                    <div className="hidden lg:block col-span-1 space-y-4">
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-6">Filters</h3>

                            <div>
                                <h4 className="font-semibold mb-3">
                                    Categories
                                </h4>
                                {categories.map((category) => (
                                    <label
                                        key={category.id}
                                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer mb-1"
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                        />
                                        <span className="text-sm">
                                            {category.name} (
                                            {category.product_count})
                                        </span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <h4 className="font-semibold mb-3">
                                    Price Range
                                </h4>
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between text-sm">
                                        <span>Under ₱100</span>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between text-sm">
                                        <span>₱100 - ₱500</span>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600"
                                        />
                                    </label>
                                    <label className="flex items-center justify-between text-sm">
                                        <span>Over ₱500</span>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-green-600"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div
                        className={
                            viewMode === "grid"
                                ? "col-span-4 lg:col-span-3"
                                : "col-span-4"
                        }
                    >
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                                    >
                                        <div className="flex gap-6">
                                            <div className="w-32 h-32 flex-shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="text-3xl font-bold text-green-700">
                                                        ₱{product.price}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-yellow-400">
                                                        <span>★★★★☆</span>
                                                        <span className="text-sm text-gray-500">
                                                            (23)
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition">
                                                        Add to Cart
                                                    </button>
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
                            <Search className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Try adjusting your search or filters. We have
                            thousands of agri products!
                        </p>
                        <Link
                            href="/buyer/products"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-green-700 transition"
                        >
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </BuyerLayout>
    );
}
