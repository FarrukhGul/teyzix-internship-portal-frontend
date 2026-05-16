import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { adminAddInternship } from '../../services/api'

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

        <div className="flex items-center justify-between p-4 md:p-6 border-b border-green-900/30">
          <h2 className="text-lg md:text-xl font-bold text-white">Add New Internship</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition">
            <MdClose className="text-2xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 flex flex-col gap-4 md:gap-5">
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

export default AddInternshipModal