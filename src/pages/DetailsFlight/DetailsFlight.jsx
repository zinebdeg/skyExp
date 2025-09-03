import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import AnimatedCard from "../../components/flightCard";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const DetailsFlight = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImg, setMainImg] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/flights/${id}`);
        const data = await response.data;
        setFlight(data);
        setMainImg(data.mainImage);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log(err);
      }
    };

    fetchFlight();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ecd3bb] flex items-center justify-center">
        <div className="text-xl">Loading flight details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ecd3bb] flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen bg-[#ecd3bb] flex items-center justify-center">
        <div className="text-xl">Flight not found</div>
      </div>
    );
  }

  // Function to get category badge text
  const getCategoryBadge = (category) => {
    switch(category) {
      case 'vip': return 'VIP';
      case 'romantic offer': return 'Romantic';
      case 'most reserved': return 'Most Reserved';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-[#ecd3bb] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-12 px-4">
        {/* Colonne gauche : miniatures */}
        <div className="flex flex-row md:flex-col gap-3 md:gap-4 items-center md:items-start">
          {/* Add main image as the first thumbnail */}
          <img
            key="main"
            src={flight.mainImage}
            alt={`${flight.title} main`}
            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 ${mainImg===flight.mainImage ? 'border-orange-500' : 'border-transparent'} cursor-pointer`}
            onClick={() => setMainImg(flight.mainImage)}
          />
          {flight.images.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`${flight.title} thumbnail ${idx+1}`}
              className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl border-2 ${mainImg===src ? 'border-orange-500' : 'border-transparent'} cursor-pointer`}
              onClick={() => setMainImg(src)}
            />
          ))}
        </div>
        
        {/* Centre : image principale + infos */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 mt-2 md:mt-0">
            <span className="font-black">{flight.title}</span>
          </h1>
          
          {/* Main image with navigation indicator */}
          <div className="relative w-full max-w-xl mb-6">
            <img 
              src={mainImg} 
              alt={flight.title} 
              className="w-full h-56 md:h-64 object-cover rounded-2xl" 
            />
            {mainImg !== flight.mainImage && (
              <button 
                onClick={() => setMainImg(flight.mainImage)}
                className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-800 font-medium py-1 px-3 rounded-lg text-sm transition-all"
              >
                ← Back to main
              </button>
            )}
          </div>
          
          <h3 className="text-lg md:text-xl font-bold mb-2">🗓️ Réservation</h3>
          <ul className="list-disc pl-6 text-base md:text-lg text-black/80 mb-4">
            <li>Minimum 7 jours à l'avance</li>
            <li>Offre valable toute l'année, sous réserve des conditions météo</li>
          </ul>
        </div>
        
        {/* Colonne droite : calendrier, prix, boutons */}
        <div
          className="w-full md:w-80 flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 mt-4 md:mt-0"
          style={{
            minHeight: "480px",
            justifyContent: "flex-start",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            borderRadius: "20px"
          }}
        >
          {/* Calendrier style CLASSIC */}
          <div className="w-full mb-6">
            <div className="flex justify-between items-center mb-2">
              <button className="text-xl font-bold bg-transparent border-none cursor-pointer">&lt;</button>
              <div className="text-lg font-bold">May <span className="font-normal">2025</span></div>
              <button className="text-xl font-bold bg-transparent border-none cursor-pointer">&gt;</button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1 w-full">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 text-center text-base gap-y-1 w-full">
              {Array.from({length:31},(_,i)=>(<div key={i} className="py-1">{i+1}</div>))}
            </div>
          </div>
          
          <div className="w-full flex flex-row justify-between items-center mb-4">
            <span className="font-bold text-lg">Price :</span>
            <span className="text-3xl font-extrabold text-[#e74c3c]">${flight.price}</span>
          </div>
          
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg mb-3 transition">check availability</button>
          <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition">CONTACT</button>
        </div>
      </div>
      
      {/* Bloc Reviews + Program + Overview */}
      <div className="w-full max-w-6xl mx-auto mt-12 px-4">
        {/* Reviews */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Reviews</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {flight.reviews.map((review, index) => (
            <div key={index} className="flex-1 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-2 min-w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                {review.avatar ? (
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-[#5a2323] flex items-center justify-center text-white text-2xl font-bold">
                    {review.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-bold text-black">{review.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {Array(review.rating).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <div className="text-xs md:text-sm text-black">
                {review.comment}
              </div>
            </div>
          ))}
        </div>
        
        {/* Program */}
        <h2 className="text-3xl font-extrabold mb-4">🎁 Pack Inclus</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {flight.program.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#d35400] mb-2">{item.miniTitle}</h3>
              <p className="text-black/80">{item.text}</p>
            </div>
          ))}
        </div>
        
        {/* Overview */}
        <h2 className="text-3xl font-extrabold mb-4">Overview</h2>
        <div className="text-base md:text-lg text-black/90 mb-6 max-w-3xl">
          <p>{flight.overview}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xl">
            {Array(Math.round(flight.rating)).fill(0).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </span>
          <span className="text-black/80">({flight.reviews.length} reviews)</span>
        </div>
      </div>
      
      {/* FLIGHT suggestion section */}
      <div className="w-full max-w-6xl mx-auto mb-0 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8">FLIGHT suggestion</h2>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-16">
          <AnimatedCard 
            title={flight.title}
            image={flight.mainImage}
            price={flight.price}
            rating={flight.rating}
            category={flight.category}
            id={flight._id}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsFlight;