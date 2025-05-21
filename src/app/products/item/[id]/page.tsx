import React, { Fragment } from "react";
import Header from "@/components/Header";
import { FiFileText, FiMapPin, FiInfo, FiShoppingCart } from "react-icons/fi";
import supabase from "@/lib/supabase-client";
import { Product } from "@/types/products";
import { Category } from "@/types/categories";
import { notFound } from "next/navigation";
import ProductImagesGallery from "@/components/ProductImagesGallery";
import TabsLayout from "@/components/TabsLayout";
import Link from "next/link";
import "../../../editor.css";

// Make this a server component for data fetching
export const dynamic = "force-dynamic";

async function getProduct(id: string): Promise<Product | null> {
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

async function getProductCategories(productId: string): Promise<Category[]> {
  // First get the category IDs for this product
  const { data: productCategories, error: pcError } = await supabase
    .from("product_categories")
    .select("category")
    .eq("product", productId);

  if (pcError || !productCategories?.length) {
    console.error("Error fetching product categories:", pcError);
    return [];
  }

  // Get the actual categories
  const categoryIds = productCategories.map((pc) => pc.category);
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .in("id", categoryIds);

  if (catError) {
    console.error("Error fetching categories:", catError);
    return [];
  }

  return categories || [];
}

async function getCategoryPath(category: Category): Promise<Category[]> {
  const path: Category[] = [category];
  let currentCategory = category;

  while (currentCategory.parent !== null) {
    const { data: parentCategory, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", currentCategory.parent)
      .single();

    if (error || !parentCategory) break;

    path.unshift(parentCategory);
    currentCategory = parentCategory;
  }

  return path;
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Get product categories and their full paths
  const productCategories = await getProductCategories(params.id);
  const categoryPaths = await Promise.all(
    productCategories.map((category) => getCategoryPath(category)),
  );

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

  // Prepare tab data
  const tabsData = [
    {
      id: "description",
      label: "Description",
      content: product.long_description || "No description available",
    },
    {
      id: "standards",
      label: "Standards / Certifications",
      content: product.standards || "No standards information available",
      standard_images: product.standard_images || [],
    },
    {
      id: "sectors",
      label: "Sectors",
      content: `<ul>${sectors.map((sector: string) => `<li>${sector}</li>`).join("")}</ul>`,
    },
    {
      id: "documentation",
      label: "Documentation",
      content: "documentation",
      docs: product.documentation || [],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header
        heading="FSM Safety Selectons"
        subheading="Explore Our Curated Collection of World-Class Safety Solutions—Selected Just for You."
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          {categoryPaths.map((path, pathIndex) => (
            <Fragment key={pathIndex}>
              {pathIndex > 0 && <span className="mx-2 text-gray-400">|</span>}
              {path.map((category, index) => (
                <Fragment key={category.id}>
                  <span className="text-gray-400">/</span>
                  <Link
                    href={`/products/${path
                      .slice(0, index + 1)
                      .map((cat) => cat.slug)
                      .join("/")}`}
                    className="hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                </Fragment>
              ))}
            </Fragment>
          ))}
          <span className="text-gray-400">/</span>
          <span className="font-medium text-gray-900">{product.heading}</span>
        </div>
      </div>

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
                <FiFileText className="h-5 w-5" />
                Technical File
              </a>
            )}
            <button className="flex items-center gap-2 rounded bg-red-700 px-6 py-2 font-semibold text-white">
              <FiMapPin size={18} /> Store Locator
            </button>
            <a
              href="#"
              className="flex items-center gap-2 rounded bg-green-600 px-6 py-2 font-semibold text-white"
            >
              <FiShoppingCart size={18} /> Buy Now
            </a>
          </div>

          {product.size && (
            <div className="mt-2">
              <div className="mb-1 flex items-center gap-1 text-lg font-bold">
                Size <FiInfo size={16} className="text-gray-400" />
              </div>
              <div className="text-lg">{product.size}</div>
            </div>
          )}
        </div>
      </div>

      {/* Tabbed Content Section */}
      <div className="mx-auto mt-12 max-w-6xl">
        <TabsLayout tabs={tabsData} />
      </div>
    </div>
  );
}
