"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const bannerData = [
  {
    id: 1,
    title: "Find Your Perfect Tutor",
    description:
      "Connecting students with qualified private tutors across various subjects and grade levels.",
    features: "Flexible Scheduling | Expert Tutors | Affordable Rates",
    buttonText: "Find Tutors Page",
    buttonLink: "/tutors",
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80",
  },
  {
    id: 2,
    title: "Learn from the Best Instructors",
    description:
      "Boost your grades and confidence with personalized 1-on-1 online or offline lessons.",
    features: "Verified Tutors | Interactive Sessions | 24/7 Support",
    buttonText: "Explore Subjects",
    buttonLink: "/subjects",
    bgImage: "https://i.ibb.co.com/zWgrWmsr/teamwork-designers.jpg",
  },
  {
    id: 3,
    title: "Master Any Subject Easily",
    description:
      "From mathematics to language learning, find the perfect match for your academic journey.",
    features: "Customized Curriculum | Affordable Pricing | Proven Results",
    buttonText: "Get Started Now",
    buttonLink: "/register",
    bgImage:
      "https://i.ibb.co.com/PGVhRPdK/classmates-studying-together-library.jpg",
  },
];

export default function HeroBanner() {
  const repeatedSlides = [...bannerData, ...bannerData, ...bannerData];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 py-6 relative select-none overflow-hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.2 },
          1024: { slidesPerView: 1.5 },
        }}
        spaceBetween={-40}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        className="mySwiper h-[450px] md:h-[600px] w-full !overflow-visible"
      >
        {repeatedSlides.map((slide, index) => (
          <SwiperSlide
            key={`${slide.id}-${index}`}
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 z-0">
              {slide.bgImage ? (
                <Image
                  src={slide.bgImage}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950" />
              )}
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6 md:px-12">
              <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-4 drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-sm md:text-xl font-medium max-w-2xl mb-3 drop-shadow-sm opacity-90">
                {slide.description}
              </p>

              <p className="text-xs md:text-base font-semibold tracking-wide text-blue-200 mb-8 max-w-xl">
                {slide.features}
              </p>

              <Link
                href={slide.buttonLink}
                className="bg-[#2B7A9B] hover:bg-[#22637D] text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-lg shadow-md transition-all transform hover:scale-105 active:scale-95"
              >
                {slide.buttonText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
