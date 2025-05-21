"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/products";
import { X } from "lucide-react";
import supabase from "@/lib/supabase-client";

interface ProductComparisonProps {
  products: Product[];
  onClose: () => void;
}

async function fetchFullProduct(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images(*),
      standard_images(*),
      documentation(*)
    `,
    )
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export default function ProductComparison({
  products,
  onClose,
}: ProductComparisonProps) {
  const [fullProducts, setFullProducts] = useState<(Product | null)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all(products.map((p) => fetchFullProduct(p.id))).then((results) => {
      if (isMounted) {
        setFullProducts(results);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [products]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="rounded-lg bg-white p-8 text-center text-lg font-semibold shadow">
          Loading product data...
        </div>
      </div>
    );
  }

  if (fullProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-7xl overflow-auto rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">Compare Products</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {fullProducts.map((product, idx) =>
              product ? (
                <div
                  key={product.id}
                  className="relative rounded-lg border p-4"
                >
                  <button
                    onClick={() => {}}
                    className="absolute right-2 top-2 rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mb-4 aspect-square">
                    <img
                      src={
                        product.product_images?.[0]?.image_url ||
                        "/placeholder.png"
                      }
                      alt={product.heading || "Product image"}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>

                  <h3 className="mb-2 font-semibold">{product.heading}</h3>

                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-600">Reference:</span>
                      <span className="ml-2">{product.reference}</span>
                    </div>

                    <div>
                      <span className="text-gray-600">Brand:</span>
                      <span className="ml-2">{product.brand}</span>
                    </div>

                    <div>
                      <span className="text-gray-600">Size:</span>
                      <span className="ml-2">{product.size}</span>
                    </div>

                    <div>
                      <span className="text-gray-600">Standards:</span>
                      <span className="ml-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.standards || "",
                          }}
                        />
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-600">Description:</span>
                      <div
                        className="mt-1 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: product.long_description || "",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={idx}
                  className="rounded-lg border p-4 text-center text-gray-400"
                >
                  Product not found
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
