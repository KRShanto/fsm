import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";

export default function Navbar() {
  // Product categories and subcategories as shown in the image
  const productCategories = [
    {
      name: "BeSafe Series",
      subcategories: [
        { name: "Gloves", origin: "Bangladesh", link: "/products/gloves" },
        {
          name: "Work Wear",
          origin: "Bangladesh",
          link: "/products/work-wear",
        },
      ],
    },
    {
      name: "Portable Fire Pump",
      subcategories: [
        {
          name: "Kube Pompa",
          origin: "Türkiye",
          link: "/products/portable-fire-pump",
        },
        { name: "Darley", origin: "USA", link: "/products/portable-fire-pump" },
      ],
    },
    {
      name: "Fire Fighting Nozzle",
      subcategories: [
        { name: "TFT", origin: "USA", link: "/products/fire-fighting-nozzle" },
        {
          name: "JJXF",
          origin: "China",
          link: "/products/fire-fighting-nozzle",
        },
      ],
    },
    {
      name: "Personal Protective Equipment (PPE)",
      subcategories: [
        { name: "UVEX", origin: "Germany", link: "/products/ppe" },
      ],
    },
    {
      name: "Fire Extinguishers",
      subcategories: [
        {
          name: "Cold-Fire",
          origin: "USA",
          link: "/products/fire-extinguishers",
        },
      ],
    },
    {
      name: "Military Vehicles",
      subcategories: [
        { name: "Darley", origin: "USA", link: "/products/military-vehicles" },
        {
          name: "Beltas",
          origin: "Türkiye",
          link: "/products/military-vehicles",
        },
      ],
    },
    {
      name: "Defense Products",
      subcategories: [
        { name: "Darley", origin: "USA", link: "/products/defense-products" },
      ],
    },
    {
      name: "Firefighting Vehicles",
      subcategories: [
        {
          name: "Beltas",
          origin: "Türkiye",
          link: "/products/firefighting-vehicles",
        },
        {
          name: "Darley",
          origin: "USA",
          link: "/products/firefighting-vehicles",
        },
      ],
    },
  ];

  return (
    <div className="sticky top-0 z-50 h-[100px] w-full">
      <div className="relative mx-auto h-full max-w-[72rem]">
        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="50,100 950,100 1000,0 0,0"
            className="fill-[#F9F6EE]"
          />
          {/* Left border */}
          <line
            x1="50"
            y1="100"
            x2="0"
            y2="0"
            className="stroke-[var(--primary)] stroke-[2]"
          />
          {/* Right border */}
          <line
            x1="950"
            y1="100"
            x2="1000"
            y2="0"
            className="stroke-[var(--primary)] stroke-[2]"
          />
          {/* Bottom border */}
          <line
            x1="50"
            y1="100"
            x2="950"
            y2="100"
            className="stroke-[var(--primary)] stroke-[4]"
          />
        </svg>
        <div className="relative z-10 flex h-full items-center justify-center gap-8">
          <Link href="/about" className="font-medium uppercase">
            About us
          </Link>

          {/* Products Dropdown */}
          <div className="group relative">
            <button className="flex items-center space-x-1 font-medium uppercase">
              <span>Products</span>
              <MdArrowDropDown size={20} />
            </button>
            <div className="absolute left-0 z-50 hidden w-[240px] rounded-sm bg-[#F9F6EE] normal-case shadow-md transition-all duration-300 group-hover:block">
              {productCategories.map((category, index) => (
                <div
                  key={index}
                  className="group/subcategory relative border-b border-gray-200 last:border-b-0"
                >
                  <div className="dropdown-item flex cursor-pointer items-center justify-between py-4 pl-6 pr-4 text-sm">
                    <span>{category.name}</span>
                    <MdArrowDropDown
                      size={16}
                      className="ml-2 -rotate-90 transform text-gray-600"
                    />
                  </div>
                  <div className="absolute left-full top-0 z-50 hidden min-w-[240px] rounded-sm bg-white shadow-md transition-all duration-200 group-hover/subcategory:block">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subcategory.link}
                        className="dropdown-item border-b border-gray-200 py-4 pl-6 pr-4 text-sm last:border-b-0 hover:text-blue-600"
                      >
                        <span>{subcategory.name}</span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({subcategory.origin})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/services" className="font-medium uppercase">
            Services
          </Link>
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="logo"
              width={300}
              height={100}
              className="max-h-[100px]"
            />
          </Link>

          {/* Library Dropdown */}
          <div className="group relative">
            <button className="flex items-center space-x-1 font-medium uppercase">
              <span>Library</span>
              <MdArrowDropDown size={20} />
            </button>
            <div className="absolute z-50 hidden w-[240px] rounded-sm bg-[#F9F6EE] normal-case shadow-md group-hover:block">
              <Link
                className="dropdown-item border-b border-gray-200 py-4 pl-6 pr-4 text-sm hover:text-blue-600"
                href="/gallery"
              >
                Gallery
              </Link>
              <Link
                className="dropdown-item py-4 pl-6 pr-4 text-sm hover:text-blue-600"
                href="/achievements"
              >
                Achievements
              </Link>
            </div>
          </div>
          <Link href="/career" className="font-medium uppercase">
            Career
          </Link>
          <Link href="/contact" className="font-medium uppercase">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
