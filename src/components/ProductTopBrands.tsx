/* eslint-disable @next/next/no-img-element */
"use client";
import Slider from "react-infinite-logo-slider";

export default function ProductTopBrands() {
  return (
    <div className="#md:pl-[10%] #2xl:pl-[18%] py-20">
      <div className="mx-auto flex max-w-[1200px] items-center gap-10">
        <h2 className="w-[20%] font-montserrat text-4xl">
          <span className="text-primary">Top Brands</span>
        </h2>

        <div
          className="h-[110px] w-[2px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(237, 28, 36, 0) 0%, #ED1C24 50%, rgba(237, 28, 36, 0) 100%)",
          }}
        ></div>

        <div className="w-[75%]">
          <Slider
            width="300px"
            duration={40}
            pauseOnHover={true}
            blurBorders={true}
            // @ts-ignore
            className="w-full space-x-8"
          >
            {[1, 1].map((n, idx) => (
              <Slider.Slide key={idx}>
                <img
                  src={`/Affiliate${n}.png`}
                  alt="Affiliates"
                  className="ticker-img mr-8"
                />
              </Slider.Slide>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
