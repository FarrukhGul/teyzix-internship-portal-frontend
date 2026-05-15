import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FaWhatsapp, FaLinkedin, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { SiThreads } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import { useLocation } from 'react-router-dom';

const Footer = () => {

  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="text-gray-400 border-t border-green-900/40">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1 — Logo + Description */}
        <div className="flex flex-col gap-4">
          <Link to="/">
            <img src={logo} alt="Teyzix Core Logo" className="h-12 w-auto" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-500">
            Teyzix Core is a modern tech studio crafting scalable, high-performance web apps, mobile solutions, and custom software for businesses worldwide.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com/company/teyzixcore/" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-green-400 transition text-xl">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/teyzixcore" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-green-400 transition text-xl">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/1D68YsTEqK/" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-green-400 transition text-xl">
              <FaFacebook />
            </a>
            <a href="https://tiktok.com/@teyzixcore" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-green-400 transition text-xl">
              <FaTiktok />
            </a>
            <a href="https://www.threads.com/@teyzixcore" target="_blank" rel="noreferrer"
              className="text-gray-500 hover:text-green-400 transition text-xl">
              <SiThreads />
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold tracking-widest uppercase text-sm">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-sm hover:text-green-400 transition">Home</Link>
            <Link to="/internships" className="text-sm hover:text-green-400 transition">Internships</Link>
            <Link to="/apply" className="text-sm hover:text-green-400 transition">Apply Now</Link>
            <Link to="/contact" className="text-sm hover:text-green-400 transition">Contact Us</Link>
          </div>
        </div>

        {/* Column 3 — Internships */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold tracking-widest uppercase text-sm">
            Internships
          </h3>
          <div className="flex flex-col gap-3">
            <p className="text-sm hover:text-green-400 transition cursor-pointer">Web Development</p>
            <p className="text-sm hover:text-green-400 transition cursor-pointer">Mobile Development</p>
            <p className="text-sm hover:text-green-400 transition cursor-pointer">UI/UX Design</p>
            <p className="text-sm hover:text-green-400 transition cursor-pointer">Digital Marketing</p>
            <p className="text-sm hover:text-green-400 transition cursor-pointer">AI / ML</p>
          </div>
        </div>

        {/* Column 4 — Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold tracking-widest uppercase text-sm">
            Contact Us
          </h3>
          <div className="flex flex-col gap-4">

            <a href="mailto:contact@teyzixcore.com"
              className="flex items-center gap-3 text-sm hover:text-green-400 transition">
              <MdEmail className="text-green-400 text-lg shrink-0" />
              contact@teyzixcore.com
            </a>

            <a href="https://wa.me/923714699788" target="_blank" rel="noreferrer"
              className="flex items-center gap-3 text-sm hover:text-green-400 transition">
              <FaWhatsapp className="text-green-400 text-lg shrink-0" />
              +92 371 4699788
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-900/40 py-6 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Teyzix Core. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Designed & Developed with ❤️ by <span className="text-green-400">Teyzix Core</span>
          </p>
        </div>
      </div>

    </footer>
  )
}

export default Footer;