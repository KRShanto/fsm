export interface ProductImage {
  id: number;
  created_at: string;
  image_url: string | null;
  product: number | null;
}

export interface Product {
  id: number;
  created_at: string;
  heading: string | null;
  subheading: string | null;
  short_description: string | null;
  reference: string | null;
  technical_file_url: string | null;
  size: string | null;
  sectors: any | null; // JSON type
  long_description: string | null;
  standards: string | null;
  product_images?: ProductImage[];
  brand: string | null;
}

export interface Documentation {
  id: number;
  created_at: string;
  name: string | null;
  file_url: string | null;
  product: number | null;
}
