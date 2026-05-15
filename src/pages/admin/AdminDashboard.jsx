import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  adminLogout,
  adminGetApplications,
  adminAddInternship,
  adminDeleteInternship,
  getInternships,
} from '../../services/api'
import {
  MdDashboard, MdWork, MdPeople, MdLogout,
  MdAdd, MdDelete, MdClose,
  MdEmail, MdPhone, MdMessage
} from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import logo from '../../assets/logo.png'

// Internship Modal 
const AddInternshipModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '', domain: '', description: '',
    duration: '', stipend: '', slots: '', isOpen: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      await adminAddInternship({ ...formData, slots: Number(formData.slots) })
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add internship')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-green-900/40 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-green-900/30">
          <h2 className="text-xl font-bold text-white">Add New Internship</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <MdClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">{error}</div>
          )}

          {[
            { label: 'Title', name: 'title', placeholder: 'e.g. Frontend Developer Intern' },
            { label: 'Domain', name: 'domain', placeholder: 'e.g. Web Development' },
            { label: 'Duration', name: 'duration', placeholder: 'e.g. 2 Months' },
            { label: 'Stipend', name: 'stipend', placeholder: 'e.g. PKR 5,000/month' },
            { label: 'Slots', name: 'slots', placeholder: 'e.g. 5', type: 'number' },
          ].map(field => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">{field.label} <span className="text-red-400">*</span></label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">Description <span className="text-red-400">*</span></label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe the internship role..."
              className="bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isOpen"
              id="isOpen"
              checked={formData.isOpen}
              onChange={handleChange}
              className="w-4 h-4 accent-green-500"
            />
            <label htmlFor="isOpen" className="text-sm text-gray-400">Open for Applications</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50"
            >
              {loading ? <><FaSpinner className="animate-spin" /> Adding...</> : 'Add Internship'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

//  Application Card 
const ApplicationCard = ({ app }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-[#111] border border-green-900/30 rounded-xl p-5 flex flex-col gap-4 hover:border-green-500/40 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-base">{app.name}</h3>
          <span className="text-green-400 text-xs tracking-wider">{app.selectedDomain}</span>
        </div>
        <span className="text-xs text-gray-500 shrink-0">
          {new Date(app.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <MdEmail className="text-green-400 shrink-0" />
          <span className="truncate">{app.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdPhone className="text-green-400 shrink-0" />
          <span>{app.phoneNumber}</span>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition w-fit"
      >
        <MdMessage />
        {expanded ? 'Hide Message' : 'View Message'}
      </button>

      {expanded && (
        <div className="bg-[#0a0a0a] border border-green-900/20 rounded-lg p-4 text-sm text-gray-400 leading-relaxed">
          {app.message}
        </div>
      )}
    </div>
  )
}

//  Main Dashboard 
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
    <div className="min-h-screen text-white">

      {showAddModal && (
        <AddInternshipModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchInternships}
        />
      )}

      {/* Top Bar */}
      <div className="border-b border-green-900/40 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Teyzix Core" className="h-10 w-auto" />
            <div>
              <h1 className="text-white font-bold text-lg leading-none">Teyzix Core</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center gap-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {logoutLoading ? <FaSpinner className="animate-spin" /> : <MdLogout />}
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-green-900/30 pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-green-400 text-green-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Applications', value: applications.length, color: 'green' },
                { label: 'Total Internships', value: internships.length, color: 'green' },
                { label: 'Open Positions', value: openApps, color: 'green' },
                { label: 'Closed Positions', value: closedApps, color: 'red' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#111] border border-green-900/30 rounded-xl p-5 flex flex-col gap-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</p>
                  <p className={`text-4xl font-bold ${stat.color === 'red' ? 'text-red-400' : 'text-green-400'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Applications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">Recent Applications</h2>
                <button onClick={() => setActiveTab('applications')} className="text-green-400 text-sm hover:text-green-300 transition">
                  View All →
                </button>
              </div>
              {loadingApps ? (
                <div className="flex justify-center py-12">
                  <FaSpinner className="text-green-400 text-3xl animate-spin" />
                </div>
              ) : applications.length === 0 ? (
                <div className="bg-[#111] border border-green-900/30 rounded-xl p-8 text-center text-gray-500">
                  No applications yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {applications.slice(0, 3).map(app => (
                    <ApplicationCard key={app._id} app={app} />
                  ))}
                </div>
              )}
            </div>

            {/* Active Internships */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">Active Internships</h2>
                <button onClick={() => setActiveTab('internships')} className="text-green-400 text-sm hover:text-green-300 transition">
                  Manage →
                </button>
              </div>
              {loadingInternships ? (
                <div className="flex justify-center py-12">
                  <FaSpinner className="text-green-400 text-3xl animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {internships.filter(i => i.isOpen).slice(0, 4).map(i => (
                    <div key={i._id} className="bg-[#111] border border-green-900/30 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-white font-semibold text-sm">{i.title}</h3>
                        <p className="text-green-400 text-xs mt-1">{i.domain} • {i.duration}</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full shrink-0">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                        </span>
                        {i.slots} Slots
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ── Applications Tab ── */}
        {activeTab === 'applications' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-xl">All Applications</h2>
              <span className="text-xs text-gray-500 bg-[#111] border border-green-900/30 px-3 py-1.5 rounded-lg">
                {applications.length} total
              </span>
            </div>

            {loadingApps ? (
              <div className="flex justify-center py-24">
                <FaSpinner className="text-green-400 text-4xl animate-spin" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-24 text-gray-500">No applications received yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map(app => (
                  <ApplicationCard key={app._id} app={app} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Internships Tab ── */}
        {activeTab === 'internships' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-xl">Manage Internships</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-green-500 text-black font-semibold px-5 py-2.5 rounded-lg hover:bg-green-400 transition text-sm"
              >
                <MdAdd className="text-lg" /> Add Internship
              </button>
            </div>

            {loadingInternships ? (
              <div className="flex justify-center py-24">
                <FaSpinner className="text-green-400 text-4xl animate-spin" />
              </div>
            ) : internships.length === 0 ? (
              <div className="text-center py-24 text-gray-500">No internships added yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internships.map(internship => (
                  <div key={internship._id}
                    className="bg-[#111] border border-green-900/30 rounded-xl p-6 flex flex-col gap-4 hover:border-green-500/40 transition">

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-white font-bold text-base">{internship.title}</h3>
                        <span className="text-green-400 text-xs tracking-wider">{internship.domain}</span>
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

                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{internship.description}</p>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {[
                        { label: 'Duration', value: internship.duration },
                        { label: 'Stipend', value: internship.stipend },
                        { label: 'Slots', value: internship.slots },
                      ].map((d, i) => (
                        <div key={i} className="bg-green-500/5 border border-green-900/20 rounded-lg p-2">
                          <p className="text-gray-500">{d.label}</p>
                          <p className="text-green-400 font-semibold mt-0.5">{d.value}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleDelete(internship._id)}
                      disabled={deletingId === internship._id}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm disabled:opacity-50"
                    >
                      {deletingId === internship._id
                        ? <><FaSpinner className="animate-spin" /> Deleting...</>
                        : <><MdDelete /> Delete</>
                      }
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Admin Footer */}
      <footer className="border-t border-green-900/40 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Teyzix Core" className="h-6 w-auto opacity-60" />
            <p className="text-xs text-gray-600">Teyzix Core — Admin Panel</p>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Teyzix Core. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default AdminDashboard