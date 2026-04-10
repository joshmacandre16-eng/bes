import React from "react";
import { Link } from "@inertiajs/react";
import { MoreVertical, Edit3, Trash2, Shield } from "lucide-react";

export default function UserTable({ users }) {
    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900">
                    User Management
                </h3>
                <p className="text-gray-600 mt-1">
                    Manage all marketplace users
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Orders
                            </th>
                            <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-8 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.phone}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {user.email}
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.role === "admin"
                                                ? "bg-orange-100 text-orange-800"
                                                : user.role === "seller"
                                                  ? "bg-purple-100 text-purple-800"
                                                  : user.role === "courier"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-sm text-gray-900">
                                    {user.orders_count || 0}
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/users/${user.id}/edit`}
                                            className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition"
                                        >
                                            <Edit3 size={16} />
                                        </Link>
                                        <button className="p-2 hover:bg-red-50 rounded-xl text-red-500 hover:text-red-700 transition">
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition">
                                            <MoreVertical size={16} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
