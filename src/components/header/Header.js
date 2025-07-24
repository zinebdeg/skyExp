import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm w-full">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
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
          <Link to="/" className="text-blue-900 font-medium hover:text-orange-500 transition-colors">HOME</Link>
          <Link to="/about" className="text-blue-900 font-medium hover:text-orange-500 transition-colors">About us</Link>
          <Link to="#flight" className="text-blue-900 font-medium hover:text-orange-500 transition-colors">Flight</Link>
          <Link to="#contact" className="text-blue-900 font-medium hover:text-orange-500 transition-colors">Contact</Link>
          <Link to="/booking" className="bg-orange-500 text-white px-6 py-2 rounded-md font-bold hover:bg-orange-600 transition">
              BOOK NOW
          </Link>
         
          </nav>
        </div>
      </header>
  );
}