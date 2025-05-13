import Header from "@/components/Header";
import Image from "next/image";
import supabase from "@/lib/supabase-client";
import { Product, ProductImage } from "@/types/products";
import Link from "next/link";

// Make this a server component for data fetching
export const dynamic = "force-dynamic";

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select(`
      *,
      product_images(*)
    `);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="bg-white font-montserrat">
      <Header
        heading="FSM Safety Selections"
        subheading="Explore Our Curated Collection of World-Class Safety Solutions—Selected Just for You."
      />
      {/* Filter Bar */}
      <div className="mb-6 mt-8 flex items-center justify-center gap-4">
        <select className="rounded border px-3 py-2">
          <option>Brand Name</option>
        </select>
        <select className="rounded border px-3 py-2">
          <option>Item Type</option>
        </select>
        <button className="rounded bg-red-500 px-6 py-2 text-white">
          Filter
        </button>
      </div>

      {/* Top Brands Section */}
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-xl font-bold text-red-500">
          TOP BRANDS
        </h2>
        {/* Top row: 4 brands, bottom border only */}
        <div className="mb-2 grid grid-cols-4 gap-2">
          {[
            {
              name: "Beltas",
              src: "https://via.placeholder.com/120x60?text=Beltas",
            },
            {
              name: "Darley",
              src: "https://via.placeholder.com/120x60?text=Darley",
            },
            {
              name: "JJXF",
              src: "https://via.placeholder.com/120x60?text=JJXF",
            },
            { name: "JSP", src: "https://via.placeholder.com/120x60?text=JSP" },
          ].map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center border-b-4 border-red-500 bg-white px-2 py-6"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                className="mb-2 h-12 object-contain"
                width={120}
                height={60}
              />
              <span className="mt-2 text-center text-sm font-medium">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
        {/* Bottom row: 3 brands, full border */}
        <div className="mb-8 grid grid-cols-3 gap-2">
          {[
            {
              name: "Kuba Pompa",
              src: "https://via.placeholder.com/120x60?text=Kuba+Pompa",
            },
            {
              name: "Task Force Tips",
              src: "https://via.placeholder.com/120x60?text=TFT",
            },
            {
              name: "Uvex",
              src: "https://via.placeholder.com/120x60?text=Uvex",
            },
          ].map((brand) => (
            <div
              key={brand.name}
              className="flex flex-col items-center border-4 border-red-500 bg-white px-2 py-6"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                className="mb-2 h-12 object-contain"
                width={120}
                height={60}
              />
              <span className="mt-2 text-center text-sm font-medium">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Section */}
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-xl font-bold text-red-500">
          ALL PRODUCTS
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => {
            // Get the first image for the product, if available
            const productImage =
              product.product_images && product.product_images.length > 0
                ? product.product_images[0].image_url
                  ? product.product_images[0].image_url
                  : "/product-default.png"
                : "/product-default.png";

            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex flex-col items-center rounded bg-white px-2 py-6 shadow-[0_0_8px_2px_rgba(255,60,60,0.15)]"
              >
                <Image
                  src={productImage}
                  alt={product.heading || "Product"}
                  className="mb-2 h-20 object-contain"
                  width={120}
                  height={100}
                />
                <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {product.brand}
                </span>
                <span className="mt-1 text-center text-base font-bold">
                  {product.heading}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
