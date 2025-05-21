"use client";

import { useComparison } from "@/context/ComparisonContext";
import { MdCompareArrows } from "react-icons/md";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductComparison from "./ProductComparison";

export default function FloatingComparisonBar() {
  const { comparisonProducts, removeFromComparison } = useComparison();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (comparisonProducts.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-2xl">
        {/* Product thumbnails */}
        {comparisonProducts.map((product) => (
          <div key={product.id} className="relative h-14 w-14 flex-shrink-0">
            <Image
              src={
                product.product_images?.[0]?.image_url ||
                "/product-placeholder.png"
              }
              alt={product.heading || "Product"}
              width={56}
              height={56}
              className="h-14 w-14 rounded border object-cover"
            />
            <button
              onClick={() => removeFromComparison(product.id)}
              className="absolute -right-2 -top-2 rounded-full bg-red-600 p-1 text-white shadow hover:bg-red-700"
              title="Remove"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {/* Empty slots */}
        {Array.from({ length: 3 - comparisonProducts.length }).map((_, idx) => (
          <div
            key={"empty-" + idx}
            className="flex h-14 w-14 items-center justify-center rounded border-2 border-dashed border-gray-300"
          />
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 flex items-center gap-2 rounded bg-blue-900 px-6 py-3 text-lg font-semibold text-white shadow transition-colors hover:bg-blue-800"
        >
          <MdCompareArrows className="h-6 w-6" />
          Compare
        </button>
      </div>
      {isModalOpen && (
        <ProductComparison
          products={comparisonProducts}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
