import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getInternships } from '../../services/api'
import { HiArrowRight } from 'react-icons/hi'
import { MdWork, MdTimer, MdAttachMoney, MdPeople } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

const Internships = () => {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await getInternships()
        setInternships(res.data.data)
      } catch (e) {
        console.log("error", e)
        setError(e.message + " | " + JSON.stringify(e.response?.data))
      } finally {
        setLoading(false)
      }
    }
    fetchInternships()
  }, [])

  return (
    <main className="text-white min-h-screen" style={{ overflowX: 'hidden' }}>

      {/* Header */}
      <section className="border-b border-green-900/40 py-16">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-8 text-center flex flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.span
            className="text-green-400 text-sm font-medium tracking-widest uppercase"
            variants={fadeUp}
            custom={0}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mr-1"
            >●</motion.span>
            Opportunities
          </motion.span>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold"
            variants={fadeUp}
            custom={1}
          >
            Available <span className="text-green-400 relative inline-block">
              Internships
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-green-400 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base"
            variants={fadeUp}
            custom={2}
          >
            Explore our current internship openings and find the perfect opportunity to grow your skills.
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">

        {/* Loading */}
        {loading && (
          <motion.div
            className="flex justify-center items-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaSpinner className="text-green-400 text-4xl animate-spin" />
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-400 text-lg">{error}</p>
          </motion.div>
        )}

        {/* No Internships */}
        {!loading && !error && internships.length === 0 && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-gray-500 text-lg">No internships available at the moment.</p>
            <p className="text-gray-600 text-sm mt-2">Please check back later.</p>
          </motion.div>
        )}

        {/* Internships Grid */}
        {!loading && !error && internships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((internship, i) => (
              <motion.div
                key={internship._id}
                className="bg-[#111] border border-green-900/30 rounded-xl p-8 flex flex-col gap-5 cursor-default"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeUp}
                custom={i % 3}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(74,222,128,0.5)',
                  transition: { duration: 0.25 }
                }}
              >

                {/* Status Badge */}
                <div className="flex justify-between items-center">
                  {internship.isOpen ? (
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                      </span>
                      Open
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                      ● Closed
                    </span>
                  )}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MdWork className="text-green-400 text-2xl" />
                  </motion.div>
                </div>

                {/* Title & Domain */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-white font-bold text-xl">{internship.title}</h3>
                  <span className="text-green-400 text-sm tracking-wider">{internship.domain}</span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {internship.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MdTimer className="text-green-400" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MdAttachMoney className="text-green-400" />
                    {internship.stipend}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MdPeople className="text-green-400" />
                    {internship.slots} Slots
                  </div>
                </div>

                {/* Apply Button */}
                {internship.isOpen && (
                  <motion.div
                    className="mt-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link to="/apply"
                      className="flex items-center justify-center gap-2 bg-green-500 text-black font-semibold px-4 py-2 rounded hover:bg-green-400 transition text-sm">
                      Apply Now
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <HiArrowRight />
                      </motion.span>
                    </Link>
                  </motion.div>
                )}

                {!internship.isOpen && (
                  <button disabled
                    className="mt-auto flex items-center justify-center gap-2 bg-gray-800 text-gray-500 font-semibold px-4 py-2 rounded cursor-not-allowed text-sm">
                    Applications Closed
                  </button>
                )}

              </motion.div>
            ))}
          </div>
        )}

      </section>

    </main>
  )
}

export default Internships