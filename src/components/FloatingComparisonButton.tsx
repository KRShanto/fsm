"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import { useComparison } from "@/context/ComparisonContext";
import ProductComparison from "./ProductComparison";

export default function FloatingComparisonButton() {
  const { comparisonProducts, clearComparison } = useComparison();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (comparisonProducts.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-colors hover:bg-blue-700"
      >
        <Scale className="h-6 w-6" />
        <span className="font-medium">
          Compare ({comparisonProducts.length}/3)
        </span>
      </button>

      {isModalOpen && (
        <ProductComparison
          products={comparisonProducts}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}
