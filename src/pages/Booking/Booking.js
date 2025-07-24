import Header from "../../components/header/Header";

export default function BookingPage() {
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
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16 px-2">
        {/* Carte ROYAL */}
        <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden">
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
        <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden">
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
        <div className="relative bg-white rounded-2xl shadow-lg flex-1 flex flex-col overflow-hidden">
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
      </div>
 
    </div>
  );
}
