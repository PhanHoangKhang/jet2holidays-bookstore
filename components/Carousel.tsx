"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface CarouselProps {
  children: React.ReactNode[];
}

export default function Carousel({ children }: CarouselProps) {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="relative group">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* Left Button */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-green-700 hover:bg-green-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-green-700 hover:bg-green-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100"
      >
        ▶
      </button>
    </div>
  );
}
