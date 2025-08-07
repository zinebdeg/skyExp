import { Link } from "react-router-dom";
import { flights } from "./data";
import FlightCard from "../../components/flightCard/FlightCard";
import PanoramicSection from "../../components/section";
export default function HomePage() {
  return (
          <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/landing.png')" }}>
      {/* Hero Section */}
            <main className=" flex items-center justify-center h-[calc(100vh-144px)] w-full">
              <div className="  flex flex-col items-center justify-center w-full h-full text-center">
          <div className="content flex flex-col items-center justify-center gap-80">

     <h1 className="text-3xl md:text-5xl font-bold text-black mb-8 drop-shadow-xl">
                  Soar Above Marrakech in Hot air Balloon
          </h1>
                <Link to="/booking" className="bg-[#a43518] hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg uppercase tracking-wider transition-colors shadow-lg">
            BOOK YOUR FLIGHT NOW
                </Link>
          </div>
           
        </div>
      </main>
            {/* Our Flights Section - Version maquette */}
            <section id="flight" className="w-full bg-[#ded1c7] py-12 ">
              <div className="max-w-5xl mx-auto rounded-2xl  p-8 md:p-12 flex flex-col gap-12  " >
                <h2 className="text-6xl font-extrabold text-center mb-6 text-[#2c2c2c]">Our Flights</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <a href="#private-flight" className="bg-white rounded-full px-6 py-2 font-bold text-[#a43518] shadow hover:bg-orange-50 transition">Private Flight</a>
                  <a href="#royal-flight" className="bg-white rounded-full px-6 py-2 font-bold text-[#a43518] shadow hover:bg-orange-50 transition">Royal Flight</a>
                  <a href="#classic-flight" className="bg-white rounded-full px-6 py-2 font-bold text-[#a43518] shadow hover:bg-orange-50 transition">Classic Flight</a>
                  <a href="#anniversaire-flight" className="bg-white rounded-full px-6 py-2 font-bold text-[#a43518] shadow hover:bg-orange-50 transition">Anniversaire Flight</a>
                  <a href="#mariage-flight" className="bg-white rounded-full px-6 py-2 font-bold text-[#a43518] shadow hover:bg-orange-50 transition">Mariage Flight</a>
                </div>
                {flights.map((flight, index) => {
                  // Map flight title to anchor id and route
                  const anchorMap = {
                    'Private Flight': { id: 'private-flight', route: '/private-flight' },
                    'Royal Flight': { id: 'royal-flight', route: '/royal-flight' },
                    'Classic Flight': { id: 'classic-flight', route: '/classic-flight' },
                    'Anniversaire Flight': { id: 'anniversaire-flight', route: '/anniversaire-flight' },
                    'Mariage Flight': { id: 'mariage-flight', route: '/mariage-flight' },
                  };
                  const anchor = anchorMap[flight.title] || { id: '', route: '/' };
                  return (
                    <div id={anchor.id} key={index}>
                      <FlightCard {...flight} imageLink={anchor.route} />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section Trusted by */}
            <section className="w-full bg-[#faf9e6] py-12">
              <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-serif font-semibold text-center mb-4">Trusted by</h2>
                <p className="text-lg text-center mb-8 font-serif">With award winning services we are trusted many companies</p>
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                  <img src="/images/airbnb.png" alt="airbnb" className="h-12 object-contain" style={{minWidth:'80px'}} />
                  <img src="/images/booking.png" alt="Booking.com" className="h-10 object-contain" style={{minWidth:'120px'}} />
                  <img src="/images/tripadvisor.png" alt="Tripadvisor" className="h-10 object-contain" style={{minWidth:'120px'}} />
                  <img src="/images/getyourguide.png" alt="GetYourGuide" className="h-10 object-contain" style={{minWidth:'120px'}} />
                </div>
              </div>
            </section>

            {/* Section Panoramic Views sans effet plein écran */}
            <PanoramicSection /> 

            {/* Section Client's Testimonials */}
            <section className="w-full bg-[#e8ded6] py-16">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-5xl font-extrabold text-white text-center mb-2">Client's Testimonials</h2>
                <p className="text-2xl text-[#eaeaea] text-center mb-12">Providing The Best Services For Our Customers</p>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                  {/* Témoignage 1 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 max-w-sm mx-auto flex flex-col gap-2 transform rotate-[-3deg]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-[#5a2323] flex items-center justify-center text-white text-2xl font-bold">L</div>
                      <div>
                        <div className="font-bold">Lizzie MackQ</div>
                        <div className="text-xs text-gray-200">il y a 6 mois</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                    </div>
                    <div className="text-sm text-gray-700">
                      Definitely a bucket list experience. Everything went smoothly on the day. Jamal and the team were great, really friendly and checked In with us throughout the morning to check we were enjoying the experience. Good value for the money with breakfast and transfers included. Thank you to Jamal. The pilot and the rest of the team.
                    </div>
                  </div>
                  {/* Témoignage 2 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 max-w-sm mx-auto flex flex-col gap-2 transform rotate-[2deg]">
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/images/avatar1.png" alt="Cecile F" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold">Cecile F</div>
                        <div className="text-xs text-gray-500">il y a 3 semaines</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                    </div>
                    <div className="text-sm text-gray-700">
                      Expérience incroyable et très bien organisée par la compagnie. Si bien que cela mérite un avis positif laissé ici afin que d'autres personnes puissent vivre la même chose en toute confiance ! Notre "pilote" était français et très rassurant, vous pouvez y foncer les yeux fermés !Merci pour tout et bravo !
                    </div>
                  </div>
                  {/* Témoignage 3 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 max-w-sm mx-auto flex flex-col gap-2 transform rotate-[-2deg]">
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/images/avatar2.png" alt="Yassine AIT BELLA" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold">Yassine AIT BELLA</div>
                        <div className="text-xs text-gray-500">décembre 2024</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array(5).fill(0).map((_,i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      J'ai vécu une expérience inoubliable en montgolfière pour admirer le lever de soleil, et c'était tout simplement magique ! Voler au-dessus des paysages à couper le souffle dans une atmosphère paisible était une sensation incroyable. Khalid a été un hôte exceptionnel, très professionnel et attentionné, ce qui a rendu cette aventure encore plus mémorable. Je recommande vivement cette activité à tous ceux qui cherchent un moment unique et inoubliable. Merci infiniment, Khalid, pour cette expérience extraordinaire ! 🎈🌅✨
                    </div>
                    <button className="text-[#5a2323] font-bold underline self-end text-sm">View more ▼</button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section ABOUT US */}
            <section id="contact" className="w-full bg-[#f5ede6] py-16">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
                {/* Image à gauche */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <img src="/images/about.png" alt="About Sky Experience" className="rounded-lg object-cover w-full max-w-sm h-64" />
                </div>
                {/* Contenu à droite */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] mb-2">ABOUT US</h2>
                  <div className="text-gray-800 text-base md:text-lg leading-relaxed">
                    <strong>Sky Experience, More Than Just a Flight</strong><br/>
                    A hot-air balloon ride is much more than a simple journey. Sky Experience turns this aerial adventure into an unforgettable moment. Watch the sun rise over the Atlas Mountains, lush oases, and expansive palm groves surrounding the city. A truly unique view awaits, offering you a bird's-eye view of Marrakech's natural beauty.
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-bold transition-colors">Check details</button>
                    {/* Icône téléphone SVG */}
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#f97316" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h0a2.25 2.25 0 002.25-2.25v-2.1a1.35 1.35 0 00-1.012-1.31l-3.2-.8a1.35 1.35 0 00-1.638.65l-.7 1.4a11.25 11.25 0 01-5.1-5.1l1.4-.7a1.35 1.35 0 00.65-1.638l-.8-3.2A1.35 1.35 0 007.6 4.5h-2.1A2.25 2.25 0 003.25 6.75v0z" />
                      </svg>
                    </span>
            </div>
          </div>
        </div>
      </section>

      
    </div>
    
  )

}