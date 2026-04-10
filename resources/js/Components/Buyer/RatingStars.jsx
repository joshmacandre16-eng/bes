import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ rating = 0, size = 16, className = "" }) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                size={size}
                className={`${
                    i <= Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i - 0.5 <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                } ${className}`}
            />,
        );
    }

    return (
        <div className="flex items-center">
            <div className="flex -space-x-1">{stars}</div>
            <span className="ml-1 text-sm font-medium text-gray-900">
                {rating.toFixed(1)}
            </span>
        </div>
    );
}
