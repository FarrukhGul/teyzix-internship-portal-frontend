import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'

const NotFound = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="text-white min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-150 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className={`relative z-10 text-center flex flex-col items-center gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* 404 Big Text */}
        <div className="relative select-none">
          <p className="text-[10rem] md:text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-green-400/80 to-green-900/20">
            404
          </p>
          {/* Glitch lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-green-400/20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* Animated dots row */}
        <div className="flex items-center gap-2 -mt-6">
          {[0, 1, 2, 3, 4].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              style={{
                animation: 'bounce 1.2s infinite',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3 max-w-md">
          <h1 className="text-2xl md:text-3xl font-bold">
            Page <span className="text-green-400">Not Found</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Looks like this page doesn't exist or has been moved. Don't worry — head back home and explore from there.
          </p>
        </div>

        {/* Terminal-style error box */}
        <div className="bg-[#111] border border-green-900/30 rounded-xl px-6 py-4 font-mono text-sm text-left w-full max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          </div>
          <p className="text-gray-600">$ curl teyzixcore.com<span className="text-green-400">{window.location.pathname}</span></p>
          <p className="text-red-400 mt-1">{'>'} Error 404: Resource not found</p>
          <p className="text-gray-600 mt-1">{'>'} Redirecting to <span className="text-green-400">home</span>...</p>
          <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse align-middle" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition"
          >
            Back to Home <HiArrowRight />
          </Link>
          <Link
            to="/internships"
            className="flex items-center justify-center gap-2 border border-green-900/50 text-gray-300 px-6 py-3 rounded-lg hover:border-green-400 hover:text-green-400 transition"
          >
            View Internships
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>

    </main>
  )
}

export default NotFound