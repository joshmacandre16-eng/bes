import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Loader from "@/Components/Common/Loader";
import UserTable from "@/Components/Admin/UserTable";

export default function AdminSellersVerify({ pendingSellers = [] }) {
    return (
        <AdminLayout title="Verify Sellers">
            <Head title="Verify Sellers" />

            <div className="space-y-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-4xl font-bold text-center py-12">
                    Seller Verification
                </div>

                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold mb-8">
                        Pending Verification ({pendingSellers.length})
                    </h2>
                    <UserTable users={pendingSellers} />
                </div>
            </div>
        </AdminLayout>
    );
}
