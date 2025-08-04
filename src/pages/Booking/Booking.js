import React, { useRef } from "react";

export default function BookingPage() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 350; // largeur d'une carte
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e7e5] flex flex-col items-center">
      {/* Section titre + image principale avec fond gris clair */}
      <div className="w-full  pb-8">
        <h1 className="text-5xl font-extrabold text-[#3d2c1e] text-center pt-8 my-10 ">Our Flights</h1>
        <div className="mx-auto w-full max-w-6xl ">
          <img
            src="/images/ourflight.png"
            alt="Our Flights"
            className="w-full h-[400px] md:h-[400px] object-cover  "
            style={{ margin: '0 auto' }}
          />
        </div>
      </div>
      <div className="w-full max-w-4xl text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#d35400] mb-2">Your Hot-Air Balloon Adventure</h2>
        <p className="text-gray-700 text-base md:text-lg">Each hot-air balloon ride is a unique experience, offering you stunning views of Marrakech, the Atlas Mountains, and the lush palm groves that surround the city.</p>
      </div>
      {/* Boutons de scroll */}
      <div className="relative w-full max-w-6xl flex items-center">
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white/80 hover:bg-white text-[#d35400] rounded-full shadow p-2 m-2 hidden md:block"
          style={{ top: '40%' }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#d35400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex flex-row gap-8 min-w-[900px] md:min-w-[1200px] px-2" style={{ scrollbarWidth: 'none' }}>
            {/* Carte ROYAL */}
            <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden min-w-[300px] max-w-[350px]">
              <img src="/images/filght.png" alt="Royal" className="w-full h-48 object-cover" />
              <span className="absolute top-3 right-3 bg-[#ff5e5e] text-white text-xs font-bold px-4 py-1 rounded-xl">VIP</span>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg text-black px-2 py-1 rounded mb-1 w-fit">ROYAL <span className="font-normal">Hot-Air Balloon Flight in Marrakech</span></div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-sm font-bold">4.9/5</span>
                  <button className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</button>
                </div>
              </div>
            </div>
            {/* Carte PRIVATE */}
            <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden min-w-[300px] max-w-[350px]">
              <img src="/images/hotair.png" alt="Private" className="w-full h-48 object-cover" />
              <span className="absolute top-3 right-3 bg-[#e17055] text-white text-xs font-bold px-4 py-1 rounded-xl">Romantic offer</span>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg text-black mb-1 ">PRIVATE <span className="font-normal">Hot-Air Balloon Flight in Marrakech</span></div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-sm font-bold">4.9/5</span>
                  <a href="/private-flight" target="_blank" rel="noopener noreferrer" className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</a>
                </div>
              </div>
            </div>
            {/* Carte CLASSIC */}
            <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden min-w-[300px] max-w-[350px]">
              <img src="/images/classic.png" alt="Classic" className="w-full h-48 object-cover" />
              <span className="absolute top-3 right-0 bg-[#f39c12] text-white text-xs font-bold px-4 py-1 rounded-l-xl">Most reserved</span>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg text-black mb-1">CLASSIC <span className="font-normal">Hot-Air Balloon Flight in Marrakech</span></div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-sm font-bold">4.9/5</span>
                  <a href="/classic-flight" target="_blank" rel="noopener noreferrer" className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</a>
                </div>
              </div>
            </div>
            {/* Carte ANNIVERSAIRE */}
            <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden min-w-[300px] max-w-[350px]">
              <img src="/images/balloon-basket.png" alt="Anniversaire" className="w-full h-48 object-cover" />
              <span className="absolute top-3 right-3 bg-[#8e44ad] text-white text-xs font-bold px-4 py-1 rounded-xl">Anniversaire</span>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg text-black mb-1">ANNIVERSAIRE <span className="font-normal">Hot-Air Balloon Flight</span></div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-sm font-bold">Sur devis</span>
                  <a href="/anniversaire-details" className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</a>
                </div>
              </div>
            </div>
            {/* Carte MARIAGE */}
            <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden min-w-[300px] max-w-[350px]">
              <img src="/images/mariage1.png" alt="Mariage" className="w-full h-48 object-cover" />
              <span className="absolute top-3 right-3 bg-[#e84393] text-white text-xs font-bold px-4 py-1 rounded-xl">Mariage</span>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-bold text-lg text-black mb-1">MARIAGE <span className="font-normal">Hot-Air Balloon Flight</span></div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-sm font-bold">Sur devis</span>
                  <a href="/mariage-details" className="ml-auto bg-[#d35400] text-white px-4 py-1 rounded-full font-bold text-xs">Check Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white/80 hover:bg-white text-[#d35400] rounded-full shadow p-2 m-2 hidden md:block"
          style={{ top: '40%' }}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#d35400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}
