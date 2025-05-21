import React from "react";
import { notFound } from "next/navigation";
import supabase from "@/lib/supabase-client";
import { Category } from "@/types/categories";
import { Product, ProductImage } from "@/types/products";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import ComparisonButton from "@/components/ComparisonButton";

interface Props {
  params: {
    slug: string[];
  };
}

interface ProductCategoryResponse {
  product_id: number;
  products: Product;
}

async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching category:", error?.message);
    return null;
  }

  return data;
}

async function getAllSubcategoryIds(categoryId: number): Promise<number[]> {
  const result: number[] = [categoryId];

  // Get immediate subcategories
  const { data: subcategories, error } = await supabase
    .from("categories")
    .select("id")
    .eq("parent", categoryId);

  if (error) {
    console.error("Error fetching subcategories:", error.message);
    return result;
  }

  // Recursively get subcategories for each immediate subcategory
  if (subcategories) {
    for (const sub of subcategories) {
      const childIds = await getAllSubcategoryIds(sub.id);
      result.push(...childIds);
    }
  }

  return result;
}

async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  // Get all subcategories recursively
  const categoryIds = await getAllSubcategoryIds(categoryId);

  // Fetch products from all relevant categories
  const { data, error } = await supabase
    .from("product_categories")
    .select(
      `
      product,
      products!inner ( * )
    `,
    )
    .in("category", categoryIds);

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  // First cast to unknown, then to our known response type
  const typedData = data as unknown as {
    product: number;
    products: Product;
  }[];
  return typedData?.map((item) => item.products) || [];
}

async function validateCategoryPath(slugs: string[]): Promise<Category | null> {
  let currentCategory: Category | null = null;

  for (const slug of slugs) {
    const category = await getCategoryBySlug(slug);

    if (!category) return null;

    // For first category, parent should be null
    if (!currentCategory && category.parent !== null) return null;

    // For subsequent categories, parent should match previous category
    if (currentCategory && category.parent !== currentCategory.id) return null;

    currentCategory = category;
  }

  return currentCategory;
}

export default async function CategoryPage({ params }: Props) {
  // Validate the entire category path
  const category = await validateCategoryPath(params.slug);

  if (!category) {
    notFound();
  }

  // Get products for this category
  const products = await getProductsByCategory(category.id);

  // Get breadcrumb data
  const breadcrumbs = await Promise.all(
    params.slug.map(async (slug) => await getCategoryBySlug(slug)),
  );

  // Filter out any null values from breadcrumbs
  const validBreadcrumbs = breadcrumbs.filter(
    (crumb): crumb is Category => crumb !== null,
  );

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header
        heading="FSM Safety Selections"
        subheading="Explore Our Curated Collection of World-Class Safety Solutions"
      />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          {validBreadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              <span className="text-gray-400">/</span>
              {index === validBreadcrumbs.length - 1 ? (
                <span className="font-medium text-gray-900">{crumb.name}</span>
              ) : (
                <Link
                  href={`/products/${params.slug.slice(0, index + 1).join("/")}`}
                  className="hover:text-blue-600"
                >
                  {crumb.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">{category.name}</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg"
            >
              {/* Compare Button - top left, absolute */}
              <div className="absolute left-3 top-3 z-10">
                <ComparisonButton product={product} iconOnly />
              </div>
              <Link
                href={`/products/item/${product.id}`}
                className="group block"
              >
                <div className="aspect-square overflow-hidden rounded-md">
                  <Image
                    src={
                      product.product_images?.[0]?.image_url ||
                      "/product-placeholder.png"
                    }
                    alt={product.heading || "Product"}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <h3 className="mt-1 font-medium">{product.heading}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {product.subheading}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
