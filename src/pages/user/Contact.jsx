import { useState } from 'react'
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { SiThreads } from 'react-icons/si'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { FaSpinner } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  return (
   <main className="text-white min-h-screen">
      {/* Header */}
      <section className="border-b border-green-900/40 py-16">
        <div className="max-w-7xl mx-auto px-8 text-center flex flex-col gap-4">
          <span className="text-green-400 text-sm font-medium tracking-widest uppercase"><span className='animate-ping'>●</span> Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold">Contact <span className="text-green-400">Us</span></h1>
          <p className="text-gray-500 max-w-xl mx-auto">Have questions about our internship program? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left — Contact Info */}
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-white">Let's Talk</h2>
            <p className="text-gray-500 leading-relaxed">
              Whether you have questions about internship opportunities, application process, or just want to learn more about Teyzix Core — we're here to help.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">

            <a href="mailto:contact@teyzixcore.com"
              className="flex items-center gap-4 group">
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg group-hover:bg-green-500/20 transition">
                <MdEmail className="text-green-400 text-2xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-white text-sm group-hover:text-green-400 transition">contact@teyzixcore.com</p>
              </div>
            </a>

            <a href="https://wa.me/923714699788" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 group">
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg group-hover:bg-green-500/20 transition">
                <FaWhatsapp className="text-green-400 text-2xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">WhatsApp</p>
                <p className="text-white text-sm group-hover:text-green-400 transition">+92 371 4699788</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                <MdLocationOn className="text-green-400 text-2xl" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
                <p className="text-white text-sm">Pakistan — Remote Friendly</p>
              </div>
            </div>

          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/teyzixcore/", label: "LinkedIn" },
                { icon: <FaInstagram />, href: "https://www.instagram.com/teyzixcore", label: "Instagram" },
                { icon: <FaFacebook />, href: "https://www.facebook.com/share/1D68YsTEqK/", label: "Facebook" },
                { icon: <FaTiktok />, href: "https://tiktok.com/@teyzixcore", label: "TikTok" },
                { icon: <SiThreads />, href: "https://www.threads.com/@teyzixcore", label: "Threads" },
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer"
                  className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-400 hover:bg-green-500/20 hover:text-green-300 transition text-xl">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Right — Form */}
        <div className="bg-[#111] border border-green-900/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8">Send a Message</h2>

          {success ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
              <div className="text-5xl">✅</div>
              <h3 className="text-xl font-bold text-green-400">Message Sent!</h3>
              <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 uppercase tracking-wider">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><FaSpinner className="animate-spin" /> Sending...</>
                  : 'Send Message'
                }
              </button>

            </form>
          )}
        </div>

      </section>

    </main>
  )
}

export default Contact