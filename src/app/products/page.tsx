import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

export default function Page() {
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded bg-white px-2 py-6 shadow-[0_0_8px_2px_rgba(255,60,60,0.15)]"
            >
              <Image
                src={`https://via.placeholder.com/120x100?text=Product+${i + 1}`}
                alt="Product"
                className="mb-2 h-20 object-contain"
                width={120}
                height={100}
              />
              <span className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                TASK FORCE TIPS
              </span>
              <span className="mt-1 text-center text-base font-bold">
                Masterstream Nozzles
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
