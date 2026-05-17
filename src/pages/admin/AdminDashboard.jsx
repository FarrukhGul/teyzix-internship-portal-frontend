import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  adminLogout, adminGetApplications,
  adminDeleteInternship, getInternships,
} from '../../services/api'
import { MdDashboard, MdWork, MdPeople, MdLogout, MdAdd, MdDelete } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import AddInternshipModal from '../../components/admin/AddInternshipModal'
import ApplicationCard from '../../components/admin/ApplicationCard'
import BottomNav from '../../components/admin/BottomNav'
import { motion, AnimatePresence } from 'framer-motion'

// ── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

const tabContent = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.07, delayChildren: 0.05 }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [applications, setApplications] = useState([])
  const [internships, setInternships] = useState([])
  const [loadingApps, setLoadingApps] = useState(true)
  const [loadingInternships, setLoadingInternships] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const fetchApplications = async () => {
    try {
      setLoadingApps(true)
      const res = await adminGetApplications()
      setApplications(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingApps(false)
    }
  }

  const fetchInternships = async () => {
    try {
      setLoadingInternships(true)
      const res = await getInternships()
      setInternships(res.data.data || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingInternships(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchApplications(), fetchInternships()])
    }
    loadData()
  }, [])

  const handleLogout = async () => {
    try {
      setLogoutLoading(true)
      await adminLogout()
      localStorage.removeItem('token')
      navigate('/admin/login')
    } catch {
      localStorage.removeItem('token')
      navigate('/admin/login')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this internship?')) return
    try {
      setDeletingId(id)
      await adminDeleteInternship(id)
      setInternships(prev => prev.filter(i => i._id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeletingId(null)
    }
  }

  const openApps = internships.filter(i => i.isOpen).length
  const closedApps = internships.filter(i => !i.isOpen).length

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <MdDashboard /> },
    { id: 'applications', label: 'Applications', icon: <MdPeople />, count: applications.length },
    { id: 'internships', label: 'Internships', icon: <MdWork />, count: internships.length },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ overflowX: 'hidden' }}>

      {showAddModal && (
        <AddInternshipModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchInternships}
        />
      )}

      {/* Top Bar */}
      <motion.div
        className="border-b border-green-900/40 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 md:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src={logo} alt="Teyzix Core" className="h-7 md:h-10 w-auto" />
            <div>
              <h1 className="text-white font-bold text-sm md:text-lg leading-none">Teyzix Core</h1>
              <p className="text-gray-500 text-xs hidden sm:block">Admin Panel</p>
            </div>
          </motion.div>
          <motion.button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition px-3 md:px-4 py-2 rounded-lg disabled:opacity-50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {logoutLoading ? <FaSpinner className="animate-spin" /> : <MdLogout />}
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-8">

        {/* Desktop Tabs */}
        <motion.div
          className="hidden md:flex gap-1 mb-8 border-b border-green-900/30"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {tabs.map((tab, i) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-green-400 text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
              whileHover={{ y: -2 }}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              className="flex flex-col gap-6 md:gap-8"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Stat Cards */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                variants={tabContent}
              >
                {[
                  { label: 'Total Applications', value: applications.length, color: 'green' },
                  { label: 'Total Internships', value: internships.length, color: 'green' },
                  { label: 'Open Positions', value: openApps, color: 'green' },
                  { label: 'Closed Positions', value: closedApps, color: 'red' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={cardItem}
                    className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-5 flex flex-col gap-1 md:gap-2"
                    whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <p className="text-gray-500 text-xs uppercase tracking-wider leading-tight">{stat.label}</p>
                    <p className={`text-3xl md:text-4xl font-bold ${stat.color === 'red' ? 'text-red-400' : 'text-green-400'}`}>
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Recent Applications */}
              <motion.div variants={cardItem}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold text-base md:text-lg">Recent Applications</h2>
                  <button onClick={() => setActiveTab('applications')} className="text-green-400 text-sm hover:text-green-300 transition">
                    View All →
                  </button>
                </div>
                {loadingApps ? (
                  <div className="flex justify-center py-12">
                    <FaSpinner className="text-green-400 text-3xl animate-spin" />
                  </div>
                ) : applications.length === 0 ? (
                  <div className="bg-[#111] border border-green-900/30 rounded-xl p-8 text-center text-gray-500 text-sm">
                    No applications yet.
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                    variants={tabContent}
                  >
                    {applications.slice(0, 3).map((app, i) => (
                      <motion.div key={app._id} variants={cardItem}>
                        <ApplicationCard app={app} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {/* Active Internships */}
              <motion.div variants={cardItem}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold text-base md:text-lg">Active Internships</h2>
                  <button onClick={() => setActiveTab('internships')} className="text-green-400 text-sm hover:text-green-300 transition">
                    Manage →
                  </button>
                </div>
                {loadingInternships ? (
                  <div className="flex justify-center py-12">
                    <FaSpinner className="text-green-400 text-3xl animate-spin" />
                  </div>
                ) : (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                    variants={tabContent}
                  >
                    {internships.filter(i => i.isOpen).slice(0, 4).map((i) => (
                      <motion.div
                        key={i._id}
                        variants={cardItem}
                        className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-5 flex items-center justify-between gap-3"
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold text-sm truncate">{i.title}</h3>
                          <p className="text-green-400 text-xs mt-1 truncate">{i.domain} • {i.duration}</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/30 px-2 md:px-3 py-1 rounded-full shrink-0">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                          </span>
                          {i.slots} Slots
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div
              key="applications"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className="flex items-center justify-between mb-4 md:mb-6" variants={cardItem}>
                <h2 className="text-white font-semibold text-lg md:text-xl">All Applications</h2>
                <span className="text-xs text-gray-500 bg-[#111] border border-green-900/30 px-3 py-1.5 rounded-lg">
                  {applications.length} total
                </span>
              </motion.div>
              {loadingApps ? (
                <div className="flex justify-center py-24">
                  <FaSpinner className="text-green-400 text-4xl animate-spin" />
                </div>
              ) : applications.length === 0 ? (
                <motion.div variants={cardItem} className="text-center py-24 text-gray-500 text-sm">
                  No applications received yet.
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                  variants={tabContent}
                >
                  {applications.map((app) => (
                    <motion.div key={app._id} variants={cardItem}>
                      <ApplicationCard app={app} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Internships Tab */}
          {activeTab === 'internships' && (
            <motion.div
              key="internships"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div className="flex items-center justify-between mb-4 md:mb-6" variants={cardItem}>
                <h2 className="text-white font-semibold text-lg md:text-xl">Manage Internships</h2>
                <motion.button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 bg-green-500 text-black font-semibold px-3 md:px-5 py-2 md:py-2.5 rounded-lg hover:bg-green-400 transition text-xs md:text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdAdd className="text-base md:text-lg" /> Add Internship
                </motion.button>
              </motion.div>
              {loadingInternships ? (
                <div className="flex justify-center py-24">
                  <FaSpinner className="text-green-400 text-4xl animate-spin" />
                </div>
              ) : internships.length === 0 ? (
                <motion.div variants={cardItem} className="text-center py-24 text-gray-500 text-sm">
                  No internships added yet.
                </motion.div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                  variants={tabContent}
                >
                  {internships.map((internship) => (
                    <motion.div
                      key={internship._id}
                      variants={cardItem}
                      className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6 flex flex-col gap-3 md:gap-4 hover:border-green-500/40 transition"
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-1 min-w-0">
                          <h3 className="text-white font-bold text-sm md:text-base truncate">{internship.title}</h3>
                          <span className="text-green-400 text-xs tracking-wider truncate">{internship.domain}</span>
                        </div>
                        {internship.isOpen ? (
                          <span className="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/30 px-2.5 py-1 rounded-full shrink-0">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                            </span>
                            Open
                          </span>
                        ) : (
                          <span className="text-xs px-2.5 py-1 rounded-full shrink-0 bg-red-500/10 text-red-400 border border-red-500/30">● Closed</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2">{internship.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        {[
                          { label: 'Duration', value: internship.duration },
                          { label: 'Stipend', value: internship.stipend },
                          { label: 'Slots', value: internship.slots },
                        ].map((d, i) => (
                          <div key={i} className="bg-green-500/5 border border-green-900/20 rounded-lg p-2">
                            <p className="text-gray-500 text-xs">{d.label}</p>
                            <p className="text-green-400 font-semibold mt-0.5 truncate">{d.value}</p>
                          </div>
                        ))}
                      </div>
                      <motion.button
                        onClick={() => handleDelete(internship._id)}
                        disabled={deletingId === internship._id}
                        className="flex items-center justify-center gap-2 w-full py-2 md:py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-xs md:text-sm disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {deletingId === internship._id
                          ? <><FaSpinner className="animate-spin" /> Deleting...</>
                          : <><MdDelete /> Delete</>
                        }
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        applicationCount={applications.length}
        internshipCount={internships.length}
      />

      {/* Footer */}
      <motion.footer
        className="border-t border-green-900/40 mt-8 md:mt-12 mb-16 md:mb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Teyzix Core" className="h-5 md:h-6 w-auto opacity-60" />
            <p className="text-xs text-gray-600">Teyzix Core — Admin Panel</p>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Teyzix Core. All rights reserved.</p>
        </div>
      </motion.footer>

    </div>
  )
}

export default AdminDashboard