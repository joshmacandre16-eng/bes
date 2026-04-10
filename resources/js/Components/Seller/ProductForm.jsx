import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Image, X } from "lucide-react";

export default function ProductForm({ product = null, onSuccess }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        category_id: product?.category_id || "",
        stock: product?.stock || "",
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        if (product) {
            put(route("seller.products.update", product.id), { onSuccess });
        } else {
            post(route("seller.products.store"), { onSuccess });
        }
    };

    const removeImage = (index) => {
        setData(
            "images",
            data.images.filter((_, i) => i !== index),
        );
    };

    return (
        <form onSubmit={submit} className="space-y-6 max-w-2xl">
            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Product Name
                </label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    placeholder="Enter product name"
                    required
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                </label>
                <textarea
                    rows="4"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-vertical"
                    placeholder="Describe your product..."
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Price (₱)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder="99.99"
                        required
                    />
                    {errors.price && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.price}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                        placeholder="0"
                        required
                    />
                    {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.stock}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Category
                </label>
                <select
                    value={data.category_id}
                    onChange={(e) => setData("category_id", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="1">Seeds & Plants</option>
                    <option value="2">Tools & Equipment</option>
                    <option value="3">Fertilizers</option>
                    <option value="4">Uniforms</option>
                </select>
                {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.category_id}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-400 transition-colors bg-gray-50">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                            setData("images", Array.from(e.target.files))
                        }
                        className="hidden"
                        id="images"
                    />
                    <label
                        htmlFor="images"
                        className="cursor-pointer flex flex-col items-center gap-2"
                    >
                        <Image size={48} className="text-gray-400" />
                        <div>
                            <p className="text-lg font-semibold text-gray-900">
                                Click to upload images
                            </p>
                            <p className="text-sm text-gray-500">
                                PNG, JPG up to 10MB (Max 5 images)
                            </p>
                        </div>
                    </label>
                </div>
                {data.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                        {data.images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    className="w-full h-24 object-cover rounded-xl"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {errors.images && (
                    <p className="mt-1 text-sm text-red-600">{errors.images}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {processing
                    ? "Publishing..."
                    : product
                      ? "Update Product"
                      : "List Product"}
            </button>
        </form>
    );
}
