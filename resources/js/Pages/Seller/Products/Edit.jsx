import React from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, usePage } from "@inertiajs/react";
import ProductForm from "@/Components/Seller/ProductForm";
import Loader from "@/Components/Common/Loader";
import ProductCard from "@/Components/Common/ProductCard";

export default function ProductsEdit({ product }) {
    const handleSuccess = () => {
        router.visit("/seller/products");
    };

    return (
        <SellerLayout title={`Edit ${product.name}`}>
            <Head title={`Edit ${product.name}`} />

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Product Preview */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Editing Product
                    </h1>
                    <ProductCard product={product} />
                </div>

                {/* Edit Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                    <ProductForm product={product} onSuccess={handleSuccess} />
                </div>
            </div>
        </SellerLayout>
    );
}
