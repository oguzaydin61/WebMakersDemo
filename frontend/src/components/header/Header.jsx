import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { carBrands } from '../../api/car.js';
import CarFilter from '../header/CarFilter.jsx';

export default function Header() {
  const [rawVehicles, setRawVehicles] = useState([]); // WP'den gelen ham liste (Hep sabit kalacak)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dev-oguzaydin61.pantheonsite.io/wp-json/wp/v2/vehicles?per_page=100')
      .then(async (response) => {
        const mappedData = await Promise.all(
          response.data.map(async (item) => {
            let finalImageUrl = 'https://via.placeholder.com/1920x1080';

            if (item.acf?.vehicle_image && typeof item.acf.vehicle_image === 'number') {
              try {
                const mediaRes = await axios.get(`https://dev-oguzaydin61.pantheonsite.io/wp-json/wp/v2/media/${item.acf.vehicle_image}`);
                finalImageUrl = mediaRes.data.source_url;
              } catch (err) {
                console.error("Görsel çözülemedi:", err);
              }
            } else if (typeof item.acf?.vehicle_image === 'string') {
              finalImageUrl = item.acf.vehicle_image;
            }

            return {
              id: item.id,
              title: item.title.rendered,
              image: finalImageUrl,
              brand: item.acf?.brand || '',
              model: item.acf?.model || '',
              engineType: item.acf?.engine_type || 'gasoline',
              price: Number(item.acf?.price || 0),
              rating: Number(item.acf?.rating || 0)
            };
          })
        );

        setRawVehicles(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("WordPress bağlantı hatası:", error);
        setLoading(false);
      });
  }, []);

  return (
    <header className="w-full h-screen flex flex-col overflow-hidden bg-[#18181c]">

      {/* ================= ÜST VİDEOLU ALAN ================= */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center text-white">

        <div className="absolute top-6 left-6 md:top-16 md:left-12 z-30 pt-10">
          <a href="/" className="inline-block">
            <img
              src="https://www.henning-automobil.de/wp-content/uploads/2023/02/LogoDachmarke_Rot-WEISS.svg"
              alt="Logo"
              className="h-8 md:h-14 w-auto object-contain"
            />
          </a>
        </div>

        <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0">
          <source src="https://www.henning-automobil.de/wp-content/uploads/2022/12/Henning-BG-Video-mit-Verlauf.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(rgba(24, 24, 28, 0) 0%, rgb(24, 24, 28) 100%)' }}
        />

        {/* Slider Kutusu - Artık hep rawVehicles kullanıyor ve filtrelerden etkilenmiyor */}
        <div className="relative z-20 w-full mx-auto px-12 overflow-visible">
          <div className="text-center mb-8 md:mb-12 select-none">
            <h1 className="text-3xl md:text-5xl font-extralight tracking-tight text-gray-300 uppercase">
              Aktuelle Verfugbare Modelle
            </h1>
            <div className="h-[1px] w-1/8 max-w-md mx-auto mt-5 bg-[linear-gradient(90deg,rgba(255,255,255,0)_-2.36%,rgba(255,255,255,0.4)_49.89%,rgba(255,255,255,0)_100%)]"></div>
          </div>

          {!loading && rawVehicles.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={1}
              centeredSlides={true}
              spaceBetween={25}
              navigation={true}
              loop={rawVehicles.length >= 3}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                768: {
                  slidesPerView: Math.min(3, rawVehicles.length),
                  spaceBetween: 40,
                },
              }}
              style={{
                '--swiper-navigation-color': '#ffffff',
                '--swiper-pagination-color': '#34d399',
                '--swiper-navigation-size': '28px',
              }}
              className="mySwiper !overflow-visible"
            >
              {rawVehicles.map((slide) => (
                <SwiperSlide key={slide.id} className="group">
                  <div className="custom-slide select-none transition-all duration-500">
                    <div className="w-full overflow-hidden">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover pointer-events-none" />
                    </div>
                    <div className="mt-4 text-center opacity-0 group-[.swiper-slide-active]:opacity-100 transition-opacity duration-500">
                      <h3 className="text-lg md:text-xl font-bold tracking-widest uppercase text-gray-200">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-400 py-10">
              {loading ? "Loading..." : "Keine Fahrzeuge gefunden."}
            </div>
          )}
        </div>
      </div>

      {/* Sadece araç verisini aşağıya paslıyoruz, callback dinlemiyoruz */}
      <div className="flex-none w-full relative z-30">
        <CarFilter vehicles={rawVehicles} />
      </div>

    </header>
  );
}