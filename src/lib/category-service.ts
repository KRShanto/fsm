import supabase from "./supabase-client";
import { Category } from "@/types/categories";

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return [];
  }
}

/**
 * Build nested category tree from flat list
 */
export function buildCategoryTree(categories: Category[]): Category[] {
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];

  // First create a map of all categories
  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  // Then build the tree structure
  categories.forEach((category) => {
    const currentCategory = categoryMap.get(category.id)!;
    if (category.parent === null) {
      rootCategories.push(currentCategory);
    } else {
      const parentCategory = categoryMap.get(category.parent);
      if (parentCategory) {
        if (!parentCategory.children) {
          parentCategory.children = [];
        }
        parentCategory.children.push(currentCategory);
      }
    }
  });

  return rootCategories;
}

/**
 * Build the full URL path for a category by traversing up its parents
 */
export function buildCategoryPath(
  category: Category,
  categoryMap: Map<number, Category>,
): string {
  const slugs: string[] = [category.slug];
  let currentCategory = category;

  while (currentCategory.parent && categoryMap.has(currentCategory.parent)) {
    currentCategory = categoryMap.get(currentCategory.parent)!;
    slugs.unshift(currentCategory.slug);
  }

  return `/products/${slugs.join("/")}`;
}

/**
 * Get categories for a specific product
 */
export async function getCategoriesByProductId(
  productId: number,
): Promise<number[]> {
  try {
    const { data, error } = await supabase
      .from("product_categories")
      .select("category")
      .eq("product", productId);

    if (error) {
      console.error("Error fetching product categories:", error.message);
      return [];
    }

    return (data || []).map((pc) => pc.category);
  } catch (error) {
    console.error("Error in getCategoriesByProductId:", error);
    return [];
  }
}
