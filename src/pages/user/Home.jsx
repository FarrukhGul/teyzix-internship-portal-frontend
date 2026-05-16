import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { MdWork, MdPeople, MdStar } from 'react-icons/md'
import logo from '../../assets/logo.png'


const Home = () => {

  return (
    <main className="text-white min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col md:flex-row lg:items-start items-center lg:justify-between justify-center gap-12">

        {/* Left */}
        <div className="flex-1 flex flex-col gap-6 text-left items-start">
          <span className="flex items-center gap-2 text-green-400 text-xs sm:text-sm font-medium tracking-widest uppercase border border-green-900/50 w-fit px-4 py-1 rounded-full">
            <span className='animate-ping'>●</span> Core of Innovation
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Launch Your <br />
            <span className="text-green-400">Tech Career</span> <br />
            With Teyzix Core
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
            Join TEYZIX CORE's internship program and work on real-world projects with industry experts. Build your portfolio and kickstart your career.
          </p>
          <div className="flex flex-wrap justify-start gap-4 mt-2">
            <Link to="/internships"
              className="flex items-center gap-2 bg-green-500 text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded hover:bg-green-400 transition whitespace-nowrap text-sm sm:text-base">
              View Internships <HiArrowRight />
            </Link>
            <Link to="/apply"
              className="flex items-center gap-2 border border-green-900/50 text-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded hover:border-green-400 hover:text-green-400 transition whitespace-nowrap text-sm sm:text-base">
              Apply Now
            </Link>
          </div>
        </div>

        {/* Right — Logo */}
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Teyzix Core" className="w-48 sm:w-72 md:w-96 opacity-90 drop-shadow-[0_0_40px_rgba(74,222,128,0.3)]" />
        </div>

      </section>

      {/* Stats Section */}
      <section className="border-y border-green-900/40 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { number: "50+", label: "Interns Hired" },
            { number: "10+", label: "Domains" },
            { number: "95%", label: "Success Rate" },
            { number: "3+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-bold text-green-400">{stat.number}</span>
              <span className="text-gray-500 text-xs sm:text-sm tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Why Join <span className="text-green-400">Teyzix Core?</span></h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">We provide real experience, mentorship, and a path to a successful tech career.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: <MdWork className="text-green-400 text-3xl sm:text-4xl" />,
              title: "Real Projects",
              desc: "Work on live, production-level projects used by real clients worldwide."
            },
            {
              icon: <MdPeople className="text-green-400 text-3xl sm:text-4xl" />,
              title: "Expert Mentorship",
              desc: "Learn directly from industry professionals with years of experience."
            },
            {
              icon: <MdStar className="text-green-400 text-3xl sm:text-4xl" />,
              title: "Career Growth",
              desc: "Build your portfolio, get a certificate, and unlock opportunities."
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#111] border border-green-900/30 rounded-xl p-6 sm:p-8 flex flex-col gap-4 hover:border-green-500/50 transition">
              {card.icon}
              <h3 className="text-white font-semibold text-lg sm:text-xl">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-green-900/40 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center flex flex-col gap-6 items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ready to <span className="text-green-400">Get Started?</span></h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg">Apply now and take the first step towards your dream tech career with Teyzix Core.</p>
          <Link to="/apply"
            className="flex items-center gap-2 bg-green-500 text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:bg-green-400 transition whitespace-nowrap text-sm sm:text-base">
            Apply Now <HiArrowRight />
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Home