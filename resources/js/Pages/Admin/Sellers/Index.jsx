import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import UserTable from "@/Components/Admin/UserTable";
import Loader from "@/Components/Common/Loader";

export default function AdminSellersIndex({ sellers = [] }) {
    return (
        <AdminLayout title="Sellers">
            <Head title="Sellers" />

            <UserTable users={sellers} />
        </AdminLayout>
    );
}
