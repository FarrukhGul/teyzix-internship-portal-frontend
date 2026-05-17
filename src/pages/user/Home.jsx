import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { MdWork, MdPeople, MdStar } from 'react-icons/md'
import logo from '../../assets/logo.png'
import { motion, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// ── CountUp ──────────────────────────────────────────────────────────────────
const CountUp = ({ end, duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      let startTime = null
      let animationFrame

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        const easeOut = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOut * end))
        if (progress < 1) animationFrame = requestAnimationFrame(animate)
        else setCount(end)
      }

      setTimeout(() => {
        animationFrame = requestAnimationFrame(animate)
      }, delay * 1000)

      return () => { if (animationFrame) cancelAnimationFrame(animationFrame) }
    }
  }, [inView, end, duration, delay])

  return <span ref={ref}>{count}</span>
}

// ── Variants — NO x translation to avoid mobile overflow ────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const statNumber = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 120 }
  })
}

const Home = () => {
  return (
    <main className="text-white min-h-screen" style={{ overflowX: 'hidden' }}>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 flex flex-col md:flex-row lg:items-start items-center lg:justify-between justify-center gap-12">

        {/* Left — fade up only, no x */}
        <motion.div
          className="flex-1 flex flex-col gap-6 text-left items-start"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } }
          }}
        >
          <motion.span
            className="flex items-center gap-2 text-green-400 text-xs sm:text-sm font-medium tracking-widest uppercase border border-green-900/50 w-fit px-4 py-1 rounded-full"
            variants={fadeUp}
            custom={0}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >●</motion.span>
            Core of Innovation
          </motion.span>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            variants={fadeUp}
            custom={1}
          >
            Launch Your <br />
            <span className="text-green-400 relative inline-block">
              Tech Career
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-green-400 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
            </span> <br />
            With Teyzix Core
          </motion.h1>

          <motion.p
            className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg"
            variants={fadeUp}
            custom={2}
          >
            Join TEYZIX CORE's internship program and work on real-world projects with industry experts. Build your portfolio and kickstart your career.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-start gap-4 mt-2"
            variants={fadeUp}
            custom={3}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/internships"
                className="flex items-center gap-2 bg-green-500 text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded hover:bg-green-400 transition whitespace-nowrap text-sm sm:text-base">
                View Internships
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <HiArrowRight />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/apply"
                className="flex items-center gap-2 border border-green-900/50 text-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded hover:border-green-400 hover:text-green-400 transition whitespace-nowrap text-sm sm:text-base">
                Apply Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right — Logo, fade up only */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <motion.div
              className="absolute inset-0 bg-green-500 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.08, 0.25] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={logo}
              alt="Teyzix Core"
              className="w-48 sm:w-72 md:w-96 opacity-90 drop-shadow-[0_0_40px_rgba(74,222,128,0.3)] relative z-10"
              animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>

      </section>

      {/* Stats Section */}
      <section className="border-y border-green-900/40 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { number: 50, label: 'Interns Hired', suffix: '+' },
            { number: 10, label: 'Domains', suffix: '+' },
            { number: 95, label: 'Success Rate', suffix: '%' },
            { number: 3, label: 'Years Experience', suffix: '+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={statNumber}
              className="flex flex-col gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="text-3xl sm:text-4xl font-bold text-green-400"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(74,222,128,0)',
                    '0 0 10px rgba(74,222,128,0.5)',
                    '0 0 0px rgba(74,222,128,0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                <CountUp end={stat.number} duration={2} delay={i * 0.15} />
                {stat.suffix}
              </motion.span>
              <span className="text-gray-500 text-xs sm:text-sm tracking-wider uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Why Join <span className="text-green-400">Teyzix Core?</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            We provide real experience, mentorship, and a path to a successful tech career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: <MdWork className="text-green-400 text-3xl sm:text-4xl" />, title: 'Real Projects', desc: 'Work on live, production-level projects used by real clients worldwide.' },
            { icon: <MdPeople className="text-green-400 text-3xl sm:text-4xl" />, title: 'Expert Mentorship', desc: 'Learn directly from industry professionals with years of experience.' },
            { icon: <MdStar className="text-green-400 text-3xl sm:text-4xl" />, title: 'Career Growth', desc: 'Build your portfolio, get a certificate, and unlock opportunities.' },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="bg-[#111] border border-green-900/30 rounded-xl p-6 sm:p-8 flex flex-col gap-4 hover:border-green-500/50 transition cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
            >
              <motion.div
                className="w-fit"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {card.icon}
              </motion.div>
              <h3 className="text-white font-semibold text-lg sm:text-xl">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="border-t border-green-900/40 py-16 sm:py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scaleUp}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center flex flex-col gap-6 items-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Ready to{' '}
            <motion.span
              className="text-green-400 inline-block"
              animate={{
                textShadow: [
                  '0 0 0px rgba(74,222,128,0)',
                  '0 0 10px rgba(74,222,128,0.5)',
                  '0 0 0px rgba(74,222,128,0)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Get Started?
            </motion.span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg">
            Apply now and take the first step towards your dream tech career with Teyzix Core.
          </p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(74,222,128,0)',
                '0 0 20px rgba(74,222,128,0.4)',
                '0 0 0px rgba(74,222,128,0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Link to="/apply"
              className="flex items-center gap-2 bg-green-500 text-black font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded hover:bg-green-400 transition whitespace-nowrap text-sm sm:text-base">
              Apply Now
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <HiArrowRight />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </main>
  )
}

export default Home