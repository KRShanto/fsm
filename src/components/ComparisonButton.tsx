"use client";

import { useState } from "react";
import { Product } from "@/types/products";
import { useComparison } from "@/context/ComparisonContext";
import { MdCompareArrows } from "react-icons/md";

interface ComparisonButtonProps {
  product: Product;
  iconOnly?: boolean;
}

export default function ComparisonButton({
  product,
  iconOnly = false,
}: ComparisonButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison } =
    useComparison();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isInComparison(product.id)) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  if (iconOnly) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`rounded-full border p-2 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isInComparison(product.id)
            ? "border-yellow-400 bg-yellow-400 text-white"
            : "border-gray-200 bg-gray-100 text-gray-500 hover:bg-gray-200"
        } `}
        title={
          isInComparison(product.id) ? "Remove from Compare" : "Add to Compare"
        }
      >
        <MdCompareArrows className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
        isInComparison(product.id)
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      <MdCompareArrows className="h-5 w-5" />
      <span>
        {isInComparison(product.id) ? "Remove from Compare" : "Add to Compare"}
      </span>
    </button>
  );
}
