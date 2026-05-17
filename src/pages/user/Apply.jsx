import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInternships, sendApplication } from '../../services/api'
import { MdArrowBack, MdCheckCircle, MdUploadFile } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'
import { motion } from 'framer-motion'

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
    resume: null,
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
    setFormData(prev => ({ ...prev, selectedDomain: domain }))
    const selected = internships.find(i => i.domain === domain)
    setSelectedInternship(selected || null)
    if (formErrors.selectedDomain) {
      setFormErrors(prev => ({ ...prev, selectedDomain: '' }))
    }
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type !== 'application/pdf') {
      setFormErrors(prev => ({ ...prev, resume: 'Only PDF files are allowed' }))
      return
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }))
      return
    }
    setFormData(prev => ({ ...prev, resume: file || null }))
    setFormErrors(prev => ({ ...prev, resume: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const currentData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber.replace(/\D/g, ''),
      selectedDomain: formData.selectedDomain,
      message: formData.message
    }

    if (!validateForm(currentData)) return

    try {
      setSubmitting(true)
      setError(null)

      // Use FormData to send file + text together
      const payload = new FormData()
      payload.append('name', currentData.name)
      payload.append('email', currentData.email)
      payload.append('phoneNumber', currentData.phoneNumber)
      payload.append('selectedDomain', currentData.selectedDomain)
      payload.append('message', currentData.message)
      if (formData.resume) {
        payload.append('resume', formData.resume)
      }

      await sendApplication(payload)
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
    <main className="text-white min-h-screen py-8 md:py-16" style={{ overflowX: 'hidden' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/internships')}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-8 md:mb-12 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ x: -4 }}
        >
          <MdArrowBack className="text-lg md:text-xl" />
          Back to Internships
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Left — Form */}
          <div className="lg:col-span-2">

            <motion.div
              className="mb-8 md:mb-12"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4"
                variants={fadeUp}
                custom={0}
              >
                Apply for{' '}
                <span className="text-green-400 relative inline-block">
                  Internship
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-green-400 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  />
                </span>
              </motion.h1>
              <motion.p className="text-gray-400 text-sm sm:text-base" variants={fadeUp} custom={1}>
                Fill out the form to submit your application
              </motion.p>
            </motion.div>

            {error && (
              <motion.div
                className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            {loading && (
              <motion.div className="flex justify-center items-center py-16 md:py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center">
                  <FaSpinner className="text-green-400 text-4xl md:text-5xl animate-spin mx-auto mb-4" />
                  <p className="text-gray-400">Loading internships...</p>
                </div>
              </motion.div>
            )}

            {success && (
              <motion.div
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 md:p-12 text-center"
                variants={scaleUp} initial="hidden" animate="visible"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}>
                  <MdCheckCircle className="text-5xl md:text-6xl text-green-400 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Application Submitted!</h2>
                <p className="text-gray-400 mb-4">Thank you! We'll review your application shortly.</p>
                <p className="text-gray-500 text-sm">Redirecting you back...</p>
              </motion.div>
            )}

            {!success && !loading && (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 md:space-y-8"
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } } }}
              >

                {/* Internship Select */}
                <motion.div
                  className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 md:p-6"
                  variants={fadeUp} custom={0}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
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
                    <motion.p className="text-red-400 text-xs md:text-sm mt-2" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                      {formErrors.selectedDomain}
                    </motion.p>
                  )}
                </motion.div>

                {/* Selected Internship Preview */}
                {selectedInternship && (
                  <motion.div
                    className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6"
                    variants={scaleUp} initial="hidden" animate="visible"
                  >
                    <h3 className="text-lg md:text-xl font-bold text-green-400 mb-2">{selectedInternship.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{selectedInternship.description}</p>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {[
                        { label: 'Duration', value: selectedInternship.duration },
                        { label: 'Stipend', value: selectedInternship.stipend },
                        { label: 'Slots', value: selectedInternship.slots },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="bg-green-500/10 rounded-lg p-2 md:p-3 text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1, type: 'spring', stiffness: 120 }}
                        >
                          <p className="text-xs text-gray-400">{item.label}</p>
                          <p className="text-sm font-semibold text-green-400">{item.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Personal Info */}
                <motion.div
                  className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6"
                  variants={fadeUp} custom={1}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-green-400 mb-4 md:mb-6">Personal Information</h3>
                  <div className="space-y-4 md:space-y-5">
                    {[
                      { label: 'Full Name', name: 'name', type: 'text' },
                      { label: 'Email', name: 'email', type: 'email' },
                      { label: 'Phone Number', name: 'phoneNumber', type: 'tel' },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium mb-2">
                          {field.label} <span className="text-red-400">*</span>
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          className="w-full bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-2 md:py-3 text-sm md:text-base text-white focus:border-green-500/50 outline-none transition"
                        />
                        {formErrors[field.name] && (
                          <motion.p className="text-red-400 text-xs mt-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                            {formErrors[field.name]}
                          </motion.p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Resume Upload */}
                <motion.div
                  className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6"
                  variants={fadeUp} custom={2}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-base md:text-lg font-semibold text-green-400 mb-4">
                    Upload Resume <span className="text-gray-500 text-xs font-normal">(Optional)</span>
                  </h3>
                  <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-green-900/40 hover:border-green-500/50 rounded-xl p-6 cursor-pointer transition group">
                    <MdUploadFile className="text-4xl text-green-400 group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                      <p className="text-sm text-gray-300">
                        {formData.resume ? formData.resume.name : 'Click to upload or drag & drop'}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">PDF only — max 5MB</p>
                    </div>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf"
                      onChange={handleResumeChange}
                      className="hidden"
                    />
                  </label>
                  {formData.resume && (
                    <div className="flex items-center justify-between mt-3 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                      <span className="text-green-400 text-xs truncate">{formData.resume.name}</span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                        className="text-gray-500 hover:text-red-400 transition text-xs ml-2 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {formErrors.resume && (
                    <motion.p className="text-red-400 text-xs mt-2" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                      {formErrors.resume}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  className="bg-[#111] border border-green-900/30 rounded-xl p-4 md:p-6"
                  variants={fadeUp} custom={3}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                >
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
                    {formErrors.message && (
                      <motion.p className="text-red-400 text-xs mt-2" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        {formErrors.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6" variants={fadeUp} custom={4}>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-black font-semibold py-3 md:py-4 rounded-lg hover:from-green-400 hover:to-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                    whileHover={{ scale: submitting ? 1 : 1.03 }}
                    whileTap={{ scale: submitting ? 1 : 0.97 }}
                  >
                    {submitting ? <><FaSpinner className="animate-spin" /> Submitting...</> : 'Submit Application'}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => navigate('/internships')}
                    className="px-4 md:px-6 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 md:py-4 rounded-lg transition text-sm md:text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>
                </motion.div>

              </motion.form>
            )}
          </div>

          {/* Right — Tips */}
          <div className="hidden lg:block">
            <motion.div
              className="sticky top-20 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8 space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div>
                <h3 className="text-lg font-bold text-green-400 mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    'Fill all fields carefully and accurately',
                    'Use a valid email address you check regularly',
                    'Be authentic and genuine in your message',
                    'Upload your resume for better chances',
                  ].map((tip, i) => (
                    <motion.li
                      key={i}
                      className="flex gap-3 items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    >
                      <span className="text-green-400 font-bold text-lg leading-none">✓</span>
                      <span>{tip}</span>
                    </motion.li>
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
            </motion.div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Apply