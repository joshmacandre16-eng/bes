import React from "react";
import SellerLayout from "@/Layouts/SellerLayout";
import { Head, useForm } from "@inertiajs/react";
import ProductForm from "@/Components/Seller/ProductForm";
import Loader from "@/Components/Common/Loader";

export default function ProductsCreate() {
    const { post, processing } = useForm({});

    const handleSuccess = () => {
        router.visit("/seller/products");
    };

    return (
        <SellerLayout title="Create Product">
            <Head title="Create Product" />

            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 mb-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center">
                            <Plus size={24} className="text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                Add New Product
                            </h1>
                            <p className="text-xl text-gray-600 mt-2">
                                List your agri product for CPSU students
                            </p>
                        </div>
                    </div>
                </div>

                <ProductForm onSuccess={handleSuccess} />
            </div>
        </SellerLayout>
    );
}
