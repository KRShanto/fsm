# FSM (Fire & Safety Management)

A modern e-commerce and information platform for fire safety equipment and services, built with Next.js 15 and TypeScript.

## 🌟 Key Features

- **Dynamic Category Navigation**
  - Unlimited nested categories support
  - Breadcrumb navigation throughout the site
  - Smart category path validation
  - Products visible in parent and child categories

- **Product Management**
  - Rich product details with multiple images
  - Technical specifications and documentation
  - Standards/certifications display
  - Tabbed content layout for organized information

- **Services Section**
  - Offline Training Programs
  - Online Training Courses
  - Consultancy Services
  - Emergency Response Planning

- **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Image galleries with zoom functionality
  - Infinite logo sliders
  - Masonry grid layouts

## 🔧 Technical Architecture

### Database Schema (Supabase)

```sql
categories
- id: int8 (PK)
- created_at: timestamptz
- name: text
- slug: text
- parent: int8 (FK to categories.id)

products
- id: int8 (PK)
- created_at: timestamptz
- heading: text
- subheading: text
- short_description: text
- long_description: text
- reference: text
- technical_file_url: text
- size: text
- sectors: json
- standards: text
- brand: text

product_categories (Junction Table)
- id: int8 (PK)
- created_at: timestamptz
- product: int8 (FK to products.id)
- category: int8 (FK to categories.id)

product_images
- id: int8 (PK)
- created_at: timestamptz
- image_url: text
- product: int8 (FK to products.id)

standard_images
- id: int8 (PK)
- created_at: timestamptz
- image_url: text
- product: int8 (FK to products.id)

documentation
- id: int8 (PK)
- created_at: timestamptz
- name: text
- file_url: text
- product: int8 (FK to products.id)
```

### Directory Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (home)/            # Home page components
│   ├── about/             # About page and components
│   ├── products/          # Product listing and details
│   │   ├── [...slug]/     # Dynamic category pages
│   │   └── item/[id]/     # Product detail pages
│   └── services/          # Service pages
├── components/            # Reusable React components
├── lib/                   # Utility functions and services
│   ├── supabase-client.ts # Database client
│   └── category-service.ts# Category management logic
└── types/                 # TypeScript type definitions
```

### Key Technologies

- **Frontend Framework**: Next.js 15 (RC)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: Server Components + Client Hooks
- **Image Handling**: Next.js Image Component
- **UI Components**: 
  - Swiper
  - React Responsive Masonry
  - React Image Magnify
  - React Infinite Logo Slider

## 🔍 For AI Assistants

### Important Implementation Details

1. **Category System**
   - Categories use a self-referential structure with parent-child relationships
   - Category paths are validated to ensure correct hierarchy
   - Products in child categories appear in parent category views
   - Slugs are used for SEO-friendly URLs

2. **Product Management**
   - Products can belong to multiple categories
   - Images are handled through separate tables for flexibility
   - Product details are split across multiple tables for organization
   - Documentation and standards are managed separately

3. **Type Safety**
   - Strict TypeScript types for database models
   - Runtime type validation for API responses
   - Custom type utilities for nested data structures

4. **Performance Considerations**
   - Server components for data fetching
   - Optimized database queries
   - Image optimization through Next.js
   - Efficient category tree traversal

### Common Operations

1. **Category Navigation**
   ```typescript
   // Get full category path
   async function getCategoryPath(category: Category): Promise<Category[]>
   
   // Build category tree
   function buildCategoryTree(categories: Category[]): Category[]
   
   // Validate category path
   async function validateCategoryPath(slugs: string[]): Promise<Category | null>
   ```

2. **Product Queries**
   ```typescript
   // Get products with category
   async function getProductsByCategory(categoryId: number): Promise<DatabaseProduct[]>
   
   // Get single product with all relations
   async function getProduct(id: string): Promise<Product | null>
   ```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
4. Run development server:
   ```bash
   npm run dev
   ```

## 📝 Development Guidelines

1. Follow TypeScript strict mode guidelines
2. Use server components by default
3. Implement proper error handling
4. Maintain breadcrumb navigation
5. Keep category validation consistent
6. Document complex logic
7. Test edge cases in category navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.
