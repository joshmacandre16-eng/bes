import React from "react";

const OrderTimeline = ({ order }) => {
    const steps = [
        { status: "placed", label: "Order Placed", date: order.created_at },
        { status: "processing", label: "Processing", date: order.updated_at },
        { status: "shipped", label: "Shipped", date: order.shipped_at },
        { status: "delivered", label: "Delivered", date: order.delivered_at },
    ];

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-4">
                {steps.map((step, index) => (
                    <div key={step.status} className="flex items-center group">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                                step.status === "delivered"
                                    ? "bg-green-500 text-white"
                                    : index <
                                        steps.findIndex(
                                            (s) => s.status === "delivered",
                                        ) +
                                            1
                                      ? "bg-green-500/20 text-green-600 border-2 border-green-500/30"
                                      : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <div className="flex-1 ml-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-gray-900">
                                    {step.label}
                                </span>
                                {step.date && (
                                    <span className="text-xs text-gray-500">
                                        {new Date(
                                            step.date,
                                        ).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 bg-green-500 rounded-full transition-all duration-500 ${
                                        index < 3 ? "w-full" : "w-0"
                                    }`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderTimeline;
