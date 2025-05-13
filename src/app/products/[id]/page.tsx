import Header from "@/components/Header";
import { FiFileText, FiMapPin, FiInfo } from "react-icons/fi";
import supabase from "@/lib/supabase-client";
import { Product } from "@/types/products";
import { notFound } from "next/navigation";
import ProductImagesGallery from "@/components/ProductImagesGallery";

// Make this a server component for data fetching
export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images(*)
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

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Get product images or use placeholders
  const productImages =
    product.product_images && product.product_images.length > 0
      ? product.product_images.map(
          (img) => img.image_url || "/product-default.png",
        )
      : ["/product-default.png"];

  // Parse sectors from JSON if present
  const sectors = product.sectors
    ? typeof product.sectors === "string"
      ? JSON.parse(product.sectors)
      : product.sectors
    : [];

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header
        heading="Product Details"
        subheading={product.heading || "Product Details"}
      />
      <div className="mx-auto mt-8 flex max-w-6xl gap-10">
        {/* Product Images Gallery (Client Component) */}
        <ProductImagesGallery images={productImages} />

        {/* Right: Product Info */}
        <div className="flex w-1/2 flex-col gap-4">
          <span className="text-sm font-semibold text-gray-400">
            {product.subheading || ""}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-900">
            {product.heading || "Product"}
          </h1>
          <p className="text-lg text-gray-700">
            {product.short_description || "No description available"}
          </p>
          <span className="text-sm text-gray-400">
            Reference: {product.reference || "N/A"}
          </span>
          <div className="mt-2 flex gap-4">
            {product.technical_file_url && (
              <a
                href={product.technical_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded bg-blue-900 px-6 py-2 font-semibold text-white"
              >
                <FiFileText size={18} /> Technical File
              </a>
            )}
            <button className="flex items-center gap-2 rounded bg-red-700 px-6 py-2 font-semibold text-white">
              <FiMapPin size={18} /> Store Locator
            </button>
          </div>

          {product.size && (
            <div className="mt-2">
              <div className="mb-1 flex items-center gap-1 text-lg font-bold">
                Size <FiInfo size={16} className="text-gray-400" />
              </div>
              <div className="text-lg">{product.size}</div>
            </div>
          )}

          <div className="mt-4">
            <div className="flex gap-8 border-b">
              <button className="border-b-2 border-yellow-400 pb-2 font-bold text-blue-900">
                Sectors
              </button>
            </div>
            {sectors.length > 0 ? (
              <ul className="mt-2 list-disc pl-6 text-gray-700">
                {sectors.map((sector: string, idx: number) => (
                  <li key={idx}>{sector}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-500">No sectors specified</p>
            )}
          </div>

          {product.standards && (
            <div className="mt-4">
              <div className="mb-1 text-lg font-bold">Standards</div>
              <p className="text-gray-700">{product.standards}</p>
            </div>
          )}

          {product.long_description && (
            <div className="mt-4">
              <div className="mb-1 text-lg font-bold">Description</div>
              <p className="text-gray-700">{product.long_description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
