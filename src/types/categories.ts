export interface Category {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  parent: number | null;
  country?: string;
  children?: Category[];
}

export interface ProductCategory {
  id: number;
  created_at: string;
  product: number;
  category: number;
}
