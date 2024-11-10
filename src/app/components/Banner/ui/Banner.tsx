"use client";

import { Banner } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

export default function BannerList({ banners }: { banners: Banner[] }) {
  return (
    <div className="relative group ease-out duration-300 transition-all">
      <Swiper
        // install Swiper modules
        className="h-[200px]  md:h-[400px] relative lg:h-[600px] w-full"
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        // navigation
        loop
        navigation={{
          nextEl: ".swipper-button-next",
          prevEl: ".swipper-button-prev",
        }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="absolute inset-0 flex items-center">
              {banner.image_url ? (
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-slate-100" />
              )}
              <div className="container mx-auto px-4 relative">
                <div className="max-w-xl">
                  <h2
                    style={{ textShadow: "1px 1px 20px #00000059" }}
                    className="text-xl md:text-3xl lg:text-5xl font-bold text-white leading-tight "
                  >
                    {banner.title}
                  </h2>
                  {banner.subtitle && (
                    <p className="text-white text-md lg:text-xl font-light py-4">
                      {banner.subtitle}
                    </p>
                  )}
                  {banner.link && (
                    <div className="flex space-x-4">
                      <Link
                        href={banner.link}
                        className="bg-blue-turquoise text-white px-8 py-3 rounded hover:bg-blue-600 transition-colors text-lg font-semibold"
                      >
                        Learn More
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="opacity-0 ease-out duration-300 transition-all group-hover:opacity-100 swipper-button-prev absolute top-0 z-10 left-0 h-full">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next slide"
          type="button"
        >
          <ChevronLeft className="stroke-slate-600" size={30} />
        </button>
      </div>
      <div className="opacity-0 ease-out duration-300 transition-all group-hover:opacity-100 swipper-button-next absolute top-0 z-10 right-0 h-full">
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next slide"
          type="button"
        >
          <ChevronRight className="stroke-slate-600" size={30} />
        </button>
      </div>
    </div>
  );
}
