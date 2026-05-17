import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RiAdminFill } from "react-icons/ri";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

const NavLink = ({ to, children, onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative text-[15px] font-medium transition duration-200 group ${
        isActive ? "text-green-400" : "text-gray-300 hover:text-green-400"
      }`}
    >
      {children}
      {/* Animated underline */}
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] bg-green-400 rounded-full"
        initial={false}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {/* Hover underline for non-active */}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 h-[2px] bg-green-400 rounded-full w-0 group-hover:w-full transition-all duration-300" />
      )}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`py-3 border-b border-green-900/30 transition flex items-center justify-between ${
        isActive ? "text-green-400 font-semibold" : "text-gray-300 hover:text-green-400"
      }`}
    >
      {children}
      {isActive && (
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      )}
    </Link>
  );
};

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
            <motion.img
              src={logo}
              alt="Teyzix Core Logo"
              className="h-11 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <span className="text-xl md:text-2xl font-bold tracking-wide text-green-500">
              Teyzix Core
            </span>
          </Link>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/internships">Internships</NavLink>
              <NavLink to="/apply">Apply</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/login"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black w-40 h-10 px-4 rounded-lg text-sm font-semibold transition duration-200 shadow-lg shadow-green-500/10"
              >
                <RiAdminFill size={18} />
                Admin Login
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden z-50"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen
              ? <RxCross1 className="text-white text-2xl" />
              : <FaBarsStaggered className="text-white text-2xl" />
            }
          </motion.button>
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
          <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink to="/internships" onClick={() => setIsOpen(false)}>Internships</MobileNavLink>
          <MobileNavLink to="/apply" onClick={() => setIsOpen(false)}>Apply</MobileNavLink>
          <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 bg-green-500 text-black px-4 py-3 rounded-lg text-sm font-semibold hover:bg-green-400 transition"
          >
            <RiAdminFill size={18} />
            Admin Login
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;