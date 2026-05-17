import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getInternships } from '../../services/api'
import { HiArrowRight } from 'react-icons/hi'
import { MdWork, MdTimer, MdAttachMoney, MdPeople } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'

const Internships = () => {
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL)
    const fetchInternships = async () => {
      try {
        const res = await getInternships()
        console.log("res", res.data)
        setInternships(res.data.data)
      } catch (e) {
        console.log("error", e)
        console.log("error response", e.response?.data)
        setError(e.message + " | " + JSON.stringify(e.response?.data))
      } finally {
        setLoading(false)
      }
    }
    fetchInternships()
  }, [])

  return (
    <main className="text-white min-h-screen">

      {/* Header */}
      <section className="border-b border-green-900/40 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center flex flex-col gap-4">
          <span className="text-green-400 text-sm font-medium tracking-widest uppercase">
            <span className='animate-pulse'>●</span> Opportunities
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold">
            Available <span className="text-green-400">Internships</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our current internship openings and find the perfect opportunity to grow your skills.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-8 py-16">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <FaSpinner className="text-green-400 text-4xl animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* No Internships */}
        {!loading && !error && internships.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No internships available at the moment.</p>
            <p className="text-gray-600 text-sm mt-2">Please check back later.</p>
          </div>
        )}

        {/* Internships Grid */}
        {!loading && !error && internships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((internship) => (
              <div key={internship._id}
                className="bg-[#111] border border-green-900/30 rounded-xl p-8 flex flex-col gap-5 hover:border-green-500/50 transition">

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
                  <MdWork className="text-green-400 text-2xl" />
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
                  <Link to="/apply"
                    className="mt-auto flex items-center justify-center gap-2 bg-green-500 text-black font-semibold px-4 py-2 rounded hover:bg-green-400 transition text-sm">
                    Apply Now <HiArrowRight />
                  </Link>
                )}

                {!internship.isOpen && (
                  <button disabled
                    className="mt-auto flex items-center justify-center gap-2 bg-gray-800 text-gray-500 font-semibold px-4 py-2 rounded cursor-not-allowed text-sm">
                    Applications Closed
                  </button>
                )}

              </div>
            ))}
          </div>
        )}

      </section>

    </main>
  )
}

export default Internships