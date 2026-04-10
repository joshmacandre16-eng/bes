import React from "react";
import {
    TrendingUp,
    Users,
    ShoppingCart,
    DollarSign,
    Package,
} from "lucide-react";

const StatsCards = ({ stats }) => {
    const statCards = [
        {
            title: "Total Users",
            value: stats.users || 0,
            change: "+12%",
            icon: Users,
            color: "text-blue-600 bg-blue-100",
        },
        {
            title: "Total Orders",
            value: stats.orders || 0,
            change: "+8%",
            icon: ShoppingCart,
            color: "text-green-600 bg-green-100",
        },
        {
            title: "Revenue",
            value: `₱${(stats.revenue || 0).toLocaleString()}`,
            change: "+23%",
            icon: DollarSign,
            color: "text-emerald-600 bg-emerald-100",
        },
        {
            title: "Active Sellers",
            value: stats.sellers || 0,
            change: "+5%",
            icon: TrendingUp,
            color: "text-purple-600 bg-purple-100",
        },
        {
            title: "Pending Deliveries",
            value: stats.deliveries || 0,
            change: "-2%",
            icon: Package,
            color: "text-orange-600 bg-orange-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {statCards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl ${card.color}`}>
                                <Icon size={24} />
                            </div>
                            <span
                                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                    card.change.startsWith("+")
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {card.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-900 mb-1 group-hover:text-gray-950 transition-colors">
                                {card.value}
                            </p>
                            <p className="text-sm text-gray-600 capitalize">
                                {card.title}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;
