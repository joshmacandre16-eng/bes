import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import BuyerLayout from "@/Layouts/BuyerLayout";
import ProductCard from "@/Components/Common/ProductCard";
import Loader from "@/Components/Common/Loader";
import { Search, Filter, X } from "lucide-react";

export default function ProductSearch({
    products = [],
    query = "",
    suggestions = [],
    filters = {},
}) {
    const [searchQuery, setSearchQuery] = useState(query);

    const handleSearch = (e) => {
        e.preventDefault();
        router.visit(
            `/buyer/products/search?q=${encodeURIComponent(searchQuery)}`,
        );
    };

    return (
        <BuyerLayout title="Product Search">
            <Head title="Search Products" />

            <div className="space-y-8">
                {/* Search Header */}
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                    <form
                        onSubmit={handleSearch}
                        className="flex gap-4 items-end flex-wrap"
                    >
                        <div className="flex-1 min-w-[300px]">
                            <label className="sr-only">Search products</label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder="Search for seeds, tools, fertilizers, uniforms..."
                                    className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-lg"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all whitespace-nowrap flex-shrink-0"
                        >
                            Search Marketplace
                        </button>
                    </form>

                    {suggestions.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-lg mb-4">
                                Quick Suggestions
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() =>
                                            setSearchQuery(suggestion)
                                        }
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-xl transition text-gray-800 font-medium"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                {products.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Search Results
                                </h2>
                                <p className="text-xl text-gray-600 mt-1">
                                    Found {products.length} products for "
                                    {query}"
                                </p>
                            </div>
                            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-2xl text-gray-700 font-semibold transition">
                                <Filter className="w-5 h-5" />
                                Filters
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-32">
                        <div className="w-32 h-32 mx-auto mb-8 p-8 bg-gray-100 rounded-3xl flex items-center justify-center">
                            <Search className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            No products found
                        </h3>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Try searching for "rice seeds", "fertilizer", "hoe",
                            or "uniform". We have thousands of agri essentials!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                href="/buyer/products"
                                className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition shadow-lg"
                            >
                                Browse All Products
                            </Link>
                            <button
                                onClick={() => router.visit("/buyer/dashboard")}
                                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition shadow-sm"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </BuyerLayout>
    );
}
