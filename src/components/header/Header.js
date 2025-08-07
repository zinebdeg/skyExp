import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
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
              <Link to="/" className=" font-bold hover:text-orange-500 transition-colors">HOME</Link>
              <Link to="/about" className="  font-bold hover:text-orange-500 transition-colors">About us</Link>
              <Link to="#flight" className="  font-bold hover:text-orange-500 transition-colors">Flight</Link>
              <Link to="#contact" className="  font-bold hover:text-orange-500 transition-colors">Contact</Link>
          </nav>

           <Link to="/booking" className="bg-[#a43518] text-white px-6 py-2 rounded-full font-bold  hover:bg-orange-600 transition">
              BOOK NOW
          </Link>
        </div>
      </header>
  );
}