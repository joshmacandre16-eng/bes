import React from "react";

export default function Loader({ message = "Loading marketplace..." }) {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-2xl border border-green-200">
                <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-lg font-semibold text-green-900">
                    {message}
                </p>
                <p className="text-sm text-gray-500">
                    Preparing your AgriShop experience...
                </p>
            </div>
        </div>
    );
}
