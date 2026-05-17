import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RiAdminFill } from "react-icons/ri";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar */}
      <header className="bg-[#0a0a0a] text-white px-5 sm:px-6 md:px-7 lg:px-8 py-4 sticky top-0 z-50 border-b border-green-900/40 font-['Sora']">
        <div className="max-w-[105rem] mx-auto flex justify-between items-center">

          {/* Left Side — Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Teyzix Core Logo" className="h-11 w-auto" />
            <span className="text-xl md:text-2xl sm:text-2xl lg:text-2xl font-bold tracking-wide text-green-500">
              Teyzix Core
            </span>
          </Link>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link to="/" className="text-[15px] font-medium text-gray-300 hover:text-green-400 transition duration-200">Home</Link>
              <Link to="/internships" className="text-[15px] font-medium text-gray-300 hover:text-green-400 transition duration-200">Internships</Link>
              <Link to="/apply" className="text-[15px] font-medium text-gray-300 hover:text-green-400 transition duration-200">Apply</Link>
              <Link to="/contact" className="text-[15px] font-medium text-gray-300 hover:text-green-400 transition duration-200">Contact</Link>
            </nav>
            <Link to="/admin/login" className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black w-40 h-10 p-5 rounded-lg text-sm font-semibold transition duration-200 shadow-lg shadow-green-500/10">
              <RiAdminFill size={18} />
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <RxCross1 className="text-white text-2xl" /> : <FaBarsStaggered className="text-white text-2xl" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-[#0a0a0a] border-l border-green-900/40 text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-green-900/40">
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <button onClick={() => setIsOpen(false)}>
            <RxCross1 className="text-white text-2xl" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-6 py-6">
          <Link to="/" onClick={() => setIsOpen(false)} className="py-3 text-gray-300 hover:text-green-400 border-b border-green-900/30 transition">Home</Link>
          <Link to="/internships" onClick={() => setIsOpen(false)} className="py-3 text-gray-300 hover:text-green-400 border-b border-green-900/30 transition">Internships</Link>
          <Link to="/apply" onClick={() => setIsOpen(false)} className="py-3 text-gray-300 hover:text-green-400 border-b border-green-900/30 transition">Apply</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="py-3 text-gray-300 hover:text-green-400 border-b border-green-900/30 transition">Contact</Link>
          <Link to="/admin/login" onClick={() => setIsOpen(false)} className="mt-6 flex items-center justify-center gap-2 bg-green-500 text-black px-4 py-3 rounded-lg text-sm font-semibold hover:bg-green-400 transition">
            <RiAdminFill size={18} />
            Admin Login
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;