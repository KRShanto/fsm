"use client";

import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronDown,
  FiInfo,
  FiFileText,
  FiMapPin,
} from "react-icons/fi";

export default function Page() {
  // Placeholder data
  const images = [
    "glove-1.png",
    "glove-2.png",
    "glove-3.png",
    "glove-4.png",
    "glove-5.png",
    "glove-6.png",
  ];
  const [selected, setSelected] = React.useState(3);

  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Header heading="Product Details" subheading="Product Details" />
      <div className="mx-auto mt-8 flex max-w-6xl gap-10">
        {/* Left: Swiper Vertical Thumbnail Carousel */}
        <div className="flex w-[100px] min-w-[100px] flex-col items-center">
          {/* Up Arrow Button */}
          <button
            aria-label="Scroll thumbnails up"
            className="z-10 mb-3 flex h-9 w-[80px] items-center justify-center rounded-full border border-gray-200 bg-white text-xl text-gray-500 shadow hover:bg-gray-100"
            id="thumbs-up-btn"
            type="button"
          >
            <FiChevronUp size={28} />
          </button>
          <div className="relative flex h-[420px] w-full flex-col items-center rounded-xl border bg-white py-4 shadow">
            <Swiper
              direction="vertical"
              slidesPerView={4}
              spaceBetween={24}
              navigation={{
                nextEl: "#thumbs-down-btn",
                prevEl: "#thumbs-up-btn",
              }}
              modules={[Navigation]}
              className="h-full w-full"
              onSlideChange={(swiper) => setSelected(swiper.activeIndex)}
              onClick={(swiper) => setSelected(swiper.clickedIndex ?? selected)}
              initialSlide={selected}
            >
              {images.map((img, idx) => (
                <SwiperSlide key={img}>
                  <div className="mx-auto mb-6 h-[90px] w-[90px] overflow-hidden">
                    <button
                      onClick={() => setSelected(idx)}
                      className={`flex h-[90px] w-[90px] items-center justify-center border bg-white shadow-sm transition-all duration-150 ${selected === idx ? "border-2 border-blue-700 shadow-lg" : "border border-gray-200 hover:border-blue-300"} ${selected === idx ? "outline outline-2 outline-blue-700" : ""}`}
                      style={{ borderRadius: 0 }}
                    >
                      <Image
                        src={`/test-product/${img}`}
                        alt={`Product thumbnail ${idx + 1}`}
                        width={80}
                        height={80}
                        className="object-contain"
                        style={{ borderRadius: 0 }}
                      />
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {/* Down Arrow Button */}
          <button
            aria-label="Scroll thumbnails down"
            className="z-10 mt-3 flex h-9 w-[80px] items-center justify-center rounded-full border border-gray-200 bg-white text-xl text-gray-500 shadow hover:bg-gray-100"
            id="thumbs-down-btn"
            type="button"
          >
            <FiChevronDown size={28} />
          </button>
        </div>
        {/* Main Image */}
        <div className="flex flex-1 flex-col items-start justify-start">
          <div className="relative mx-auto flex h-[400px] w-[400px] items-center justify-center rounded-2xl border bg-gray-50">
            <Image
              src={`/test-product/${images[selected]}`}
              alt="main"
              width={400}
              height={400}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        {/* Right: Product Info */}
        <div className="flex w-1/2 flex-col gap-4">
          <span className="text-sm font-semibold text-gray-400">
            Works in wet environment
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-900">
            APOLLON VV733
          </h1>
          <p className="text-lg text-gray-700">
            Mechanical glove with high breathability and easy to spot with its
            fluorescent backing, ideal in wet conditions
          </p>
          <span className="text-sm text-gray-400">Reference : VV733</span>
          <div className="mt-2 flex gap-4">
            <button className="flex items-center gap-2 rounded bg-blue-900 px-6 py-2 font-semibold text-white">
              <FiFileText size={18} /> Technical File
            </button>
            <button className="flex items-center gap-2 rounded bg-blue-900 px-6 py-2 font-semibold text-white">
              <FiMapPin size={18} /> Store Locator
            </button>
          </div>
          <div className="mt-4">
            <div className="mb-1 text-lg font-bold">Color</div>
            <div className="flex gap-2">
              <span className="inline-block h-7 w-7 rounded-full border-2 border-gray-300 bg-gradient-to-tr from-yellow-400 to-black"></span>
              <span className="inline-block h-7 w-7 rounded-full border-2 border-gray-300 bg-gradient-to-tr from-orange-400 to-black"></span>
            </div>
          </div>
          <div className="mt-2">
            <div className="mb-1 flex items-center gap-1 text-lg font-bold">
              Size <FiInfo size={16} className="text-gray-400" />
            </div>
            <div className="text-lg">07 , 08 , 09 , 10</div>
          </div>
          <div className="mt-4">
            <div className="flex gap-8 border-b">
              <button className="border-b-2 border-yellow-400 pb-2 font-bold text-blue-900">
                Sectors
              </button>
              <button className="pb-2 font-bold text-gray-400">Risks</button>
            </div>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
              <li>Agriculture</li>
              <li>Public Works</li>
              <li>Finishing Works/Craftsmanship</li>
              <li>Maintenance</li>
              <li>Automotive</li>
              <li>Forestry</li>
              <li>Storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
