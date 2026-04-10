import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import UserTable from "@/Components/Admin/UserTable";
import Loader from "@/Components/Common/Loader";

export default function AdminUsersIndex({ users = [] }) {
    return (
        <AdminLayout title="Users">
            <Head title="Users" />

            <UserTable users={users} />
        </AdminLayout>
    );
}
