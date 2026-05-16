import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInternships, sendApplication } from '../../services/api'
import { MdArrowBack, MdCheckCircle } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'

const Apply = () => {
  const navigate = useNavigate()
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [selectedInternship, setSelectedInternship] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    selectedDomain: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true)
        const res = await getInternships()
        const openInternships = res.data.data.filter(i => i.isOpen)
        setInternships(openInternships)
      } catch (err) {
        setError('Failed to load internships')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchInternships()
  }, [])

  const validateForm = (data) => {
    const errors = {}
    if (!data.selectedDomain.trim()) errors.selectedDomain = 'Please select an internship'
    if (!data.name.trim()) errors.name = 'Full name is required'
    if (!data.email.trim()) errors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Invalid email format'
    if (!data.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required'
    if (!/^\d{11}$/.test(data.phoneNumber.replace(/\D/g, ''))) errors.phoneNumber = 'Phone number must be 11 digits'
    if (!data.message.trim()) errors.message = 'Please tell us about yourself'
    if (data.message.trim().length < 50) errors.message = 'Please write at least 50 characters'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInternshipChange = (e) => {
    const domain = e.target.value
    console.log("Domain selected:", domain) // debug
    setFormData(prev => ({ ...prev, selectedDomain: domain }))
    const selected = internships.find(i => i.domain === domain)
    setSelectedInternship(selected || null)
    if (formErrors.selectedDomain) {
      setFormErrors(prev => ({ ...prev, selectedDomain: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Latest formData directly use karo
    const currentData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
      selectedDomain: formData.selectedDomain,
      message: formData.message
    }

    console.log("Submitting:", currentData) // debug

    if (!validateForm(currentData)) return

    try {
      setSubmitting(true)
      setError(null)
      await sendApplication(currentData)
      setSuccess(true)
      setTimeout(() => navigate('/internships'), 2500)
    } catch (err) {
      console.log("Error:", err.response?.data)
      setError(err.response?.data?.message || 'Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
   <main className="text-white min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate('/internships')}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-8 md:mb-12 text-sm md:text-base"
        >
          <MdArrowBack className="text-lg md:text-xl" />
          Back to Internships
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Left — Form */}
          <div className="lg:col-span-2">
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
                Apply for <span className="text-green-400">Internship</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">Fill out the form to submit your application</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center py-16 md:py-24">
                <div className="text-center">
                  <FaSpinner className="text-green-400 text-4xl md:text-5xl animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading internships...</p>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 md:p-12 text-center">
                <MdCheckCircle className="text-5xl md:text-6xl text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Application Submitted!</h2>
                <p className="text-gray-400 mb-4">Thank you! We'll review your application shortly.</p>
                <p className="text-gray-500 text-sm">Redirecting you back...</p>
              </div>
            )}

            {!success && !loading && (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

                {/* Internship Select */}
                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 md:p-6">
                  <label className="block text-sm md:text-base font-semibold mb-3 md:mb-4">
                    Select Internship <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="selectedDomain"
                    value={formData.selectedDomain}
                    onChange={handleInternshipChange}
                    className="w-full bg-[#0a0a0a] border border-green-900/50 rounded-lg px-4 py-3 md:py-4 text-white text-sm md:text-base focus:border-green-500 outline-none transition"
                  >
                    <option value="">Choose an internship...</option>
                    {internships.map(internship => (
                      <option key={internship._id} value={internship.domain}>
                        {internship.title} — {internship.domain}
                      </option>
                    ))}
                  </select>
                  {formErrors.selectedDomain && (
                    <p className="text-red-400 text-xs md:text-sm mt-2">{formErrors.selectedDomain}</p>
                  )}
                </div>

                {/* Selected Internship Preview */}
                {selectedInternship && (
                  <div className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-green-400 mb-2">{selectedInternship.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{selectedInternship.description}</p>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <div className="bg-green-500/10 rounded-lg p-2 md:p-3 text-center">
                        <p className="text-xs text-gray-400">Duration</p>
                        <p className="text-sm font-semibold text-green-400">{selectedInternship.duration}</p>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-2 md:p-3 text-center">
                        <p className="text-xs text-gray-400">Stipend</p>
                        <p className="text-sm font-semibold text-green-400">{selectedInternship.stipend}</p>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-2 md:p-3 text-center">
                        <p className="text-xs text-gray-400">Slots</p>
                        <p className="text-sm font-semibold text-green-400">{selectedInternship.slots}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Personal Info */}
                <div className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-green-400 mb-4 md:mb-6">Personal Information</h3>
                  <div className="space-y-4 md:space-y-5">

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder=""
                        className="w-full bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-2 md:py-3 text-sm md:text-base text-white focus:border-green-500/50 outline-none transition"
                      />
                      {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder=""
                        className="w-full bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-2 md:py-3 text-sm md:text-base text-white focus:border-green-500/50 outline-none transition"
                      />
                      {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder=""
                        className="w-full bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-2 md:py-3 text-sm md:text-base text-white focus:border-green-500/50 outline-none transition"
                      />
                      {formErrors.phoneNumber && <p className="text-red-400 text-xs mt-1">{formErrors.phoneNumber}</p>}
                    </div>

                  </div>
                </div>

                {/* Message */}
                <div className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-green-400 mb-4 md:mb-6">Why Do You Want This Internship?</h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tell us about yourself <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Share your experience, skills, and why this opportunity matters to you..."
                      className="w-full bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 md:py-4 text-sm md:text-base text-white focus:border-green-500/50 outline-none transition resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-500 text-xs">Minimum 50 characters</p>
                      <p className={`text-xs ${formData.message.length >= 50 ? 'text-green-400' : 'text-gray-500'}`}>
                        {formData.message.length} / 50+
                      </p>
                    </div>
                    {formErrors.message && <p className="text-red-400 text-xs mt-2">{formErrors.message}</p>}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold py-3 md:py-4 rounded-lg hover:from-green-400 hover:to-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {submitting ? <><FaSpinner className="animate-spin" /> Submitting...</> : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/internships')}
                    className="px-4 md:px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 md:py-4 rounded-lg transition text-sm md:text-base"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right — Tips */}
          <div className="hidden lg:block">
            <div className="sticky top-20 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-green-400 mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    'Fill all fields carefully and accurately',
                    'Use a valid email address you check regularly',
                    'Be authentic and genuine in your message',
                    'Write at least 50 characters to stand out',
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-green-400 font-bold text-lg leading-none">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-green-500/20 pt-6">
                <h3 className="text-lg font-bold text-green-400 mb-3">Pro Tips</h3>
                <ul className="space-y-2 text-xs text-gray-400">
                  {['Highlight your unique skills', 'Mention relevant projects', 'Show enthusiasm for the role', 'Keep it professional & concise'].map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-green-500/20 pt-6">
                <h3 className="text-lg font-bold text-green-400 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-400 mb-4">Check internship details to understand what each role requires.</p>
                <button onClick={() => navigate('/internships')} className="w-full text-green-400 hover:text-green-300 text-sm font-semibold transition">
                  View All Internships →
                </button>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  💡 <span className="font-semibold text-green-400">Pro Tip:</span> Customize your message for each application to stand out!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Apply