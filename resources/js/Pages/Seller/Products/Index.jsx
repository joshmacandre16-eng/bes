import React, { useState } from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, Link } from "@inertiajs/react";
import ProductCard from "@/Components/Common/ProductCard";
import Loader from "@/Components/Common/Loader";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";

export default function SellerProductsIndex({ products = [], stats = {} }) {
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("grid");

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <SellerLayout title="Products">
            <Head title="Products" />

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Your Products
                        </h1>
                        <p className="text-xl text-gray-600">
                            {stats.active} active • {stats.draft} drafts •{" "}
                            {stats.total} total
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/seller/products/create"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition flex items-center gap-3"
                        >
                            <Plus size={20} />
                            Add New Product
                        </Link>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[300px] relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search your products..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className={`p-3 rounded-2xl ${viewMode === "grid" ? "bg-green-100 text-green-700 shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                            onClick={() => setViewMode("grid")}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v10h8V4H6zm3 7a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            className={`p-3 rounded-2xl ${viewMode === "list" ? "bg-green-100 text-green-700 shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                            onClick={() => setViewMode("list")}
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
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Products */}
                <div>
                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all hover:-translate-y-2"
                                >
                                    <ProductCard product={product} />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-3xl flex items-end p-6 opacity-0 group-hover:opacity-100">
                                        <div className="flex gap-2 w-full">
                                            <Link
                                                href={`/seller/products/${product.id}/edit`}
                                                className="flex-1 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-2xl font-semibold hover:shadow-md transition flex items-center gap-2 justify-center"
                                            >
                                                <Edit size={18} />
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-2xl font-semibold hover:shadow-lg transition flex items-center gap-2 justify-center flex-1"
                                            >
                                                <Eye size={18} />
                                                Preview
                                            </Link>
                                            <button className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-2xl hover:shadow-md transition flex items-center gap-2 justify-center">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all"
                                >
                                    <div className="flex items-start gap-6">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-32 h-32 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                                        />
                                        <div className="flex-1 grid grid-cols-3 gap-6 items-start">
                                            <div className="col-span-2">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 mb-6 line-clamp-3">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="text-3xl font-bold text-green-700">
                                                        ₱{product.price}
                                                    </div>
                                                    <div className="flex text-yellow-400 -space-x-1">
                                                        <Star
                                                            fill="currentColor"
                                                            size={20}
                                                        />
                                                        <Star
                                                            fill="currentColor"
                                                            size={20}
                                                        />
                                                        <Star
                                                            fill="currentColor"
                                                            size={20}
                                                        />
                                                        <Star
                                                            fill="currentColor"
                                                            size={20}
                                                        />
                                                        <Star size={20} />
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        (124 sales)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span>
                                                        Stock:{" "}
                                                        <span
                                                            className={`font-bold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                                                        >
                                                            {product.stock}
                                                        </span>
                                                    </span>
                                                    <span>
                                                        Category:{" "}
                                                        {product.category?.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex flex-col gap-2 pt-2">
                                                    <Link
                                                        href={`/seller/products/${product.id}/edit`}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-semibold transition shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
                                                    >
                                                        <Edit size={18} />
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl font-semibold transition shadow-md hover:shadow-lg flex items-center gap-2 justify-center"
                                                    >
                                                        <Eye size={18} />
                                                        Preview
                                                    </Link>
                                                    <button className="bg-red-100 hover:bg-red-200 text-red-700 p-4 rounded-2xl font-semibold hover:shadow-md transition flex items-center gap-2 justify-center">
                                                        <Trash2 size={18} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-32">
                        <div className="w-32 h-32 mx-auto mb-8 p-12 bg-gray-100 rounded-3xl flex items-center justify-center">
                            <Package className="w-20 h-20 text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No products found
                        </h3>
                        <p className="text-xl text-gray-600 mb-8">
                            Get started by adding your first agri product to the
                            marketplace.
                        </p>
                        <Link
                            href="/seller/products/create"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition hover:-translate-y-1"
                        >
                            <Plus size={24} />
                            Add Your First Product
                        </Link>
                    </div>
                )}
            </div>
        </SellerLayout>
    );
}
