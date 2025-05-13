"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface ProductImagesGalleryProps {
  images: string[];
}

export default function ProductImagesGallery({
  images,
}: ProductImagesGalleryProps) {
  const [selected, setSelected] = React.useState(0);

  return (
    <>
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
              <SwiperSlide key={`thumb-${idx}`}>
                <div className="mx-auto mb-6 h-[90px] w-[90px] overflow-hidden">
                  <button
                    onClick={() => setSelected(idx)}
                    className={`flex h-[90px] w-[90px] items-center justify-center border bg-white shadow-sm transition-all duration-150 ${selected === idx ? "border-2 border-blue-700 shadow-lg" : "border border-gray-200 hover:border-blue-300"} ${selected === idx ? "outline outline-2 outline-blue-700" : ""}`}
                    style={{ borderRadius: 0 }}
                  >
                    <Image
                      src={img}
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
            src={images[selected]}
            alt="main product image"
            width={400}
            height={400}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  );
}
