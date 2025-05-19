import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import {
  getAllCategories,
  buildCategoryTree,
  buildCategoryPath,
} from "@/lib/category-service";
import { Category } from "@/types/categories";

// Make this a server component for data fetching
export const dynamic = "force-dynamic";

export default async function Navbar() {
  // Fetch all categories and build the tree
  const allCategories = await getAllCategories();
  const categoryTree = buildCategoryTree(allCategories);

  // Create a map for quick category lookups
  const categoryMap = new Map<number, Category>();
  allCategories.forEach((category) => {
    categoryMap.set(category.id, category);
  });

  // Recursive function to render nested categories
  function renderCategories(categories: Category[]) {
    return categories.map((category) => (
      <div
        key={category.id}
        className="group/subcategory relative border-b border-gray-200 last:border-b-0"
      >
        {category.children && category.children.length > 0 ? (
          <>
            <Link
              href={buildCategoryPath(category, categoryMap)}
              className="dropdown-item flex cursor-pointer items-center justify-between py-4 pl-6 pr-4 text-sm hover:text-blue-600"
            >
              <span>{category.name}</span>
              <div className="flex items-center gap-2">
                {category.country && (
                  <span className="text-xs text-gray-500">
                    (made in {category.country})
                  </span>
                )}
                <MdArrowDropDown
                  size={16}
                  className="ml-2 -rotate-90 transform text-gray-600"
                />
              </div>
            </Link>
            <div className="absolute left-full top-0 z-50 hidden min-w-[240px] rounded-sm bg-white shadow-md transition-all duration-200 group-hover/subcategory:block">
              {renderCategories(category.children)}
            </div>
          </>
        ) : (
          <Link
            href={buildCategoryPath(category, categoryMap)}
            className="dropdown-item border-b border-gray-200 py-4 pl-6 pr-4 text-sm last:border-b-0 hover:text-blue-600"
          >
            <div className="flex w-full items-center justify-between">
              <span>{category.name}</span>
              {category.country && (
                <span className="text-xs text-gray-500">
                  (made in {category.country})
                </span>
              )}
            </div>
          </Link>
        )}
      </div>
    ));
  }

  // Services categories and subcategories as shown in the image
  const serviceCategories = [
    {
      name: "Off-line Training",
      subcategories: [
        {
          name: "Safety Management System (SMS)",
          items: [
            {
              name: "Commercial Safety Management System",
              link: "/services/sms/commercial",
            },
            {
              name: "Industrial Safety Management System",
              link: "/services/sms/industrial",
            },
          ],
        },
        {
          name: "Fire Management System",
          items: [
            {
              name: "Industrial Fire Management System",
              link: "/services/fire-management/industrial",
            },
            {
              name: "Commercial Fire Management System",
              link: "/services/fire-management/commercial",
            },
            {
              name: "Seaport Firefighting Tactics",
              link: "/services/fire-management/seaport",
            },
            {
              name: "Firefighting Equipment use and Selection",
              link: "/services/fire-management/equipment",
            },
          ],
        },
        {
          name: "Emergency Response Plan (ERP)",
          items: [
            {
              name: "Commercial Emergency Response Plan",
              link: "/services/erp/commercial",
            },
            {
              name: "Residential Emergency Response Plan",
              link: "/services/erp/residential",
            },
          ],
        },
        {
          name: "Occupational Safety & Health (OSH)",
          items: [
            {
              name: "Hazardous Communication (HazCom)",
              link: "/services/osh/hazcom",
            },
            { name: "Trauma Mannual (NaDaP)", link: "/services/osh/trauma" },
            {
              name: "Hazardous Operation (HazOp)",
              link: "/services/osh/hazop",
            },
            {
              name: "Personal Protective Equipment (PPE)",
              link: "/services/osh/ppe",
            },
            {
              name: "Hazard Identification & Risk Assessment (HIRA)",
              link: "/services/osh/hira",
            },
            { name: "Confined Space", link: "/services/osh/confined-space" },
            {
              name: "Respiratory Protection System",
              link: "/services/osh/respiratory",
            },
            {
              name: "Life Control Protection",
              link: "/services/osh/life-control",
            },
            {
              name: "Gas Detection System",
              link: "/services/osh/gas-detection",
            },
            { name: "Breathing Air", link: "/services/osh/breathing-air" },
          ],
        },
        {
          name: "Process Safety Management (PSM)",
          items: [
            {
              name: "Fundamental of Process Safety Management (PSM)",
              link: "/services/psm/fundamental",
            },
            { name: "Design Safety", link: "/services/psm/design" },
            {
              name: "Design of Job Safety Analysis (JSA)",
              link: "/services/psm/jsa",
            },
            {
              name: "Basics of Process Hazard Analysis (PHA)",
              link: "/services/psm/pha",
            },
          ],
        },
      ],
    },
    {
      name: "On-line Training",
      subcategories: [
        {
          name: "Safety Management System (SMS)",
          items: [
            {
              name: "Basics of Industrial Safety Management System",
              link: "/services/online/sms/industrial",
            },
            {
              name: "Basics of Commercial Safety Management System",
              link: "/services/online/sms/commercial",
            },
            {
              name: "Basics of Residential Safety Management System",
              link: "/services/online/sms/residential",
            },
          ],
        },
        {
          name: "Fire Management System",
          items: [
            {
              name: "Industrial Fire Management",
              link: "/services/online/fire/industrial",
            },
            {
              name: "Commercial Fire Management",
              link: "/services/online/fire/commercial",
            },
            {
              name: "Residential Fire Management",
              link: "/services/online/fire/residential",
            },
            {
              name: "Firefighting Tactics Knowledge and Equipment",
              link: "/services/online/fire/tactics",
            },
          ],
        },
        {
          name: "Emergency Response Plan (ERP)",
          items: [
            {
              name: "Commercial Emergency Response Plan",
              link: "/services/online/erp/commercial",
            },
            {
              name: "Residential Emergency Response Plan",
              link: "/services/online/erp/residential",
            },
          ],
        },
        {
          name: "Occupational Safety & Health (OSH)",
          items: [
            {
              name: "Hazardous Communication (HazCom) Basics",
              link: "/services/online/osh/hazcom",
            },
            {
              name: "Hazardous Operation (HazOp) Basics",
              link: "/services/online/osh/hazop",
            },
            {
              name: "Personal Protective Equipment (PPE) Basics",
              link: "/services/online/osh/ppe",
            },
            {
              name: "Hazard Identification & Risk Assessment (HIRA) Basics",
              link: "/services/online/osh/hira",
            },
            {
              name: "Basics of Construction Safety",
              link: "/services/online/osh/construction",
            },
            {
              name: "Basics of Respiratory Protection System",
              link: "/services/online/osh/respiratory",
            },
            {
              name: "Basics of Job Critical Procedures (JCP)",
              link: "/services/online/osh/jcp",
            },
            {
              name: "Basics of Gas Detection System",
              link: "/services/online/osh/gas-detection",
            },
          ],
        },
        {
          name: "Process Safety Management (PSM)",
          items: [
            {
              name: "Basics of Process Safety Management (PSM)",
              link: "/services/online/psm/basics",
            },
            {
              name: "Basics of Process Hazard Analysis (PHA)",
              link: "/services/online/psm/pha",
            },
          ],
        },
      ],
    },
    {
      name: "Consultancy",
      subcategories: [
        {
          name: "Safety Management System (SMS)",
          items: [
            {
              name: "Industrial",
              link: "/services/consultancy/sms/industrial",
            },
            {
              name: "Residential",
              link: "/services/consultancy/sms/residential",
            },
          ],
        },
        {
          name: "Fire Management System (FMS)",
          items: [
            {
              name: "Industrial",
              link: "/services/consultancy/fms/industrial",
            },
            {
              name: "Commercial",
              link: "/services/consultancy/fms/commercial",
            },
            {
              name: "Residential",
              link: "/services/consultancy/fms/residential",
            },
          ],
        },
        {
          name: "Emergency Response Plan (ERP)",
          items: [
            {
              name: "Industrial",
              link: "/services/consultancy/erp/industrial",
            },
            {
              name: "Commercial",
              link: "/services/consultancy/erp/commercial",
            },
            {
              name: "Residential",
              link: "/services/consultancy/erp/residential",
            },
          ],
        },
        {
          name: "Process Safety Management (PSM)",
          items: [
            {
              name: "Industrial",
              link: "/services/consultancy/psm/industrial",
            },
          ],
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
              {renderCategories(categoryTree)}
            </div>
          </div>

          {/* Services Dropdown - Complex Multi-level */}
          <div className="group relative">
            <button className="flex items-center space-x-1 font-medium uppercase">
              <span>Services</span>
              <MdArrowDropDown size={20} />
            </button>
            <div className="absolute left-0 z-50 hidden w-[240px] rounded-sm bg-[#F9F6EE] normal-case shadow-md transition-all duration-300 group-hover:block">
              {serviceCategories.map((category, index) => (
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
                  <div className="absolute left-full top-0 z-50 hidden min-w-[280px] rounded-sm bg-white shadow-md transition-all duration-200 group-hover/subcategory:block">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <div
                        key={subIndex}
                        className="group/subitem relative border-b border-gray-200 last:border-b-0"
                      >
                        <div className="dropdown-item flex cursor-pointer items-center justify-between py-3 pl-6 pr-4 text-sm">
                          <span>{subcategory.name}</span>
                          <MdArrowDropDown
                            size={16}
                            className="ml-2 -rotate-90 transform text-gray-600"
                          />
                        </div>
                        <div className="absolute left-full top-0 z-50 hidden max-h-[80vh] min-w-[320px] overflow-y-auto rounded-sm bg-white shadow-md transition-all duration-200 group-hover/subitem:block">
                          {subcategory.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.link}
                              className="dropdown-item border-b border-gray-200 py-3 pl-6 pr-4 text-sm last:border-b-0 hover:text-blue-600"
                            >
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
