import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const handleDropdownEnter = () => setDropdownOpen(true);
  const handleDropdownLeave = () => setDropdownOpen(false);
  return (
    <header className="bg-white/5 backdrop-blur-sm shadow-sm w-full HeaderComponentClass p-8 bg-[#ded1c7]"> 
        <div className="container mx-auto px-8 py-2 flex flex-col md:flex-row justify-between items-center bg-white rounded-full">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <img  
              src="/images/logo.png" 
              alt="SKY EXPERIENCE Logo"
              className="h-12 md:h-16 w-auto"
            />
          </div>
          {/* Menu */}
        
  

          <nav className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
              <Link to="/" className={`font-bold hover:text-orange-500 transition-colors${isActive("/") ? " text-orange-500 underline" : ""}`}>HOME</Link>
              <Link to="/about" className={`font-bold hover:text-orange-500 transition-colors${isActive("/about") ? " text-orange-500 underline" : ""}`}>About us</Link>
              <div className="relative" onMouseEnter={handleDropdownEnter} >
                <button className={`font-bold hover:text-orange-500 transition-colors flex items-center gap-1 ${["/private-flight","/royal-flight","/classic-flight","/anniversaire-flight","/mariage-flight"].includes(location.pathname) ? "text-orange-500 underline" : ""}`}
                  type="button">
                  Flight
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div  onMouseLeave={handleDropdownLeave} className={`absolute left-0 mt-2 w-48 z-50 bg-white rounded-xl shadow-lg border border-gray-200 transition-opacity ${dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                  <Link to="/private-flight" className="block px-6 py-3 hover:bg-orange-50 text-gray-900 font-medium">Private Flight</Link>
                  <Link to="/royal-flight" className="block px-6 py-3 hover:bg-orange-50 text-gray-900 font-medium">Royal Flight</Link>
                  <Link to="/classic-flight" className="block px-6 py-3 hover:bg-orange-50 text-gray-900 font-medium">Classic Flight</Link>
                  <Link to="/anniversaire-flight" className="block px-6 py-3 hover:bg-orange-50 text-gray-900 font-medium">Anniversaire Flight</Link>
                  <Link to="/mariage-flight" className="block px-6 py-3 hover:bg-orange-50 text-gray-900 font-medium">Mariage Flight</Link>
                </div>
              </div>
              <Link to="/contact" className={`font-bold hover:text-orange-500 transition-colors${isActive("/contact") ? " text-orange-500 underline" : ""}`}>Contact</Link>
          </nav>

           <Link to="/booking" className="bg-[#a43518] text-white px-6 py-2 rounded-full font-bold  hover:bg-orange-600 transition">
              BOOK NOW
          </Link>
        </div>
      </header>
  );
}