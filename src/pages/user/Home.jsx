import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { MdWork, MdPeople, MdStar } from 'react-icons/md'
import logo from '../../assets/logo.png'

const Home = () => {
  return (
    <main className="text-white min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left */}
        <div className="flex-1 flex flex-col gap-6">
          <span className="flex items-center gap-2 text-green-400 text-sm font-medium tracking-widest uppercase border border-green-900/50 w-fit px-4 py-1 rounded-full">
            ● Core of Innovation
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Launch Your <br />
            <span className="text-green-400">Tech Career</span> <br />
            With Teyzix Core
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            Join TEYZIX CORE's internship program and work on real-world projects with industry experts. Build your portfolio and kickstart your career.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Link to="/internships"
              className="flex items-center gap-2 bg-green-500 text-black font-semibold px-6 py-3 rounded hover:bg-green-400 transition whitespace-nowrap">
              View Internships <HiArrowRight />
            </Link>
            <Link to="/apply"
              className="flex items-center gap-2 border border-green-900/50 text-gray-300 px-6 py-3 rounded hover:border-green-400 hover:text-green-400 transition whitespace-nowrap">
              Apply Now
            </Link>
          </div>
        </div>

        {/* Right — Logo */}
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Teyzix Core" className="w-72 md:w-96 opacity-90 drop-shadow-[0_0_40px_rgba(74,222,128,0.3)]" />
        </div>

      </section>

      {/* Stats Section */}
      <section className="border-y border-green-900/40 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "50+", label: "Interns Hired" },
            { number: "10+", label: "Domains" },
            { number: "95%", label: "Success Rate" },
            { number: "3+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-4xl font-bold text-green-400">{stat.number}</span>
              <span className="text-gray-500 text-sm tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Join <span className="text-green-400">Teyzix Core?</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto">We provide real experience, mentorship, and a path to a successful tech career.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MdWork className="text-green-400 text-4xl" />,
              title: "Real Projects",
              desc: "Work on live, production-level projects used by real clients worldwide."
            },
            {
              icon: <MdPeople className="text-green-400 text-4xl" />,
              title: "Expert Mentorship",
              desc: "Learn directly from industry professionals with years of experience."
            },
            {
              icon: <MdStar className="text-green-400 text-4xl" />,
              title: "Career Growth",
              desc: "Build your portfolio, get a certificate, and unlock opportunities."
            },
          ].map((card, i) => (
            <div key={i} className="bg-[#111] border border-green-900/30 rounded-xl p-8 flex flex-col gap-4 hover:border-green-500/50 transition">
              {card.icon}
              <h3 className="text-white font-semibold text-xl">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-green-900/40 py-24">
        <div className="max-w-7xl mx-auto px-8 text-center flex flex-col gap-6 items-center">
          <h2 className="text-4xl font-bold">Ready to <span className="text-green-400">Get Started?</span></h2>
          <p className="text-gray-500 max-w-lg">Apply now and take the first step towards your dream tech career with Teyzix Core.</p>
          <Link to="/apply"
            className="flex items-center gap-2 bg-green-500 text-black font-semibold px-8 py-3 rounded hover:bg-green-400 transition whitespace-nowrap">
            Apply Now <HiArrowRight />
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Home