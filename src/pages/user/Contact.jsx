import { useState } from 'react'
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'
import { SiThreads } from 'react-icons/si'
import { MdEmail, MdLocationOn, MdCheckCircle } from 'react-icons/md'
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

// Social icon: slides in from left, stagger handled by parent
const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

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

  const socials = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/teyzixcore/", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/teyzixcore", label: "Instagram" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/share/1D68YsTEqK/", label: "Facebook" },
    { icon: <FaTiktok />, href: "https://tiktok.com/@teyzixcore", label: "TikTok" },
    { icon: <SiThreads />, href: "https://www.threads.com/@teyzixcore", label: "Threads" },
  ]

  return (
    <main className="text-white min-h-screen" style={{ overflowX: 'hidden' }}>

      {/* Header */}
      <section className="border-b border-green-900/40 py-16">
        <motion.div
          className="max-w-7xl mx-auto px-8 text-center flex flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } }
          }}
        >
          <motion.span
            className="text-green-400 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2"
            variants={fadeUp}
            custom={0}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >●</motion.span>
            Get In Touch
          </motion.span>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold"
            variants={fadeUp}
            custom={1}
          >
            Contact{' '}
            <span className="text-green-400 relative inline-block">
              Us
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-green-400 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-500 max-w-xl mx-auto"
            variants={fadeUp}
            custom={2}
          >
            Have questions about our internship program? We'd love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left — Contact Info */}
        <motion.div
          className="flex flex-col gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.13, delayChildren: 0.0 } }
          }}
        >
          <motion.div className="flex flex-col gap-6" variants={fadeUp} custom={0}>
            <h2 className="text-2xl font-bold text-white">Let's Talk</h2>
            <p className="text-gray-500 leading-relaxed">
              Whether you have questions about internship opportunities, application process, or just want to learn more about Teyzix Core — we're here to help.
            </p>
          </motion.div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5">
            {[
              {
                href: "mailto:contact@teyzixcore.com",
                icon: <MdEmail className="text-green-400 text-2xl" />,
                label: 'Email',
                text: 'contact@teyzixcore.com',
                isLink: true,
              },
              {
                href: "https://wa.me/923714699788",
                icon: <FaWhatsapp className="text-green-400 text-2xl" />,
                label: 'WhatsApp',
                text: '+92 371 4699788',
                isLink: true,
                external: true,
              },
              {
                icon: <MdLocationOn className="text-green-400 text-2xl" />,
                label: 'Location',
                text: 'Pakistan — Remote Friendly',
                isLink: false,
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1} whileHover={{ y: -3 }}>
                {item.isLink ? (
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    className="flex items-center gap-4 group"
                  >
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg group-hover:bg-green-500/20 transition">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white text-sm group-hover:text-green-400 transition">{item.text}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white text-sm">{item.text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div className="flex flex-col gap-4" variants={fadeUp} custom={4}>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Follow Us</h3>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg text-green-400 hover:bg-green-500/20 hover:text-green-300 transition text-xl"
                  variants={slideLeft}
                  custom={i}
                  whileHover={{ y: -5, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

        </motion.div>

        {/* Right — Form */}
        <motion.div
          className="bg-[#111] border border-green-900/30 rounded-2xl p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          custom={0}
        >
          <motion.h2
            className="text-2xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Send a Message
          </motion.h2>

          {success ? (
            <motion.div
              className="flex flex-col items-center justify-center py-12 gap-4 text-center"
              variants={scaleUp}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
              >
                <MdCheckCircle className="text-6xl text-green-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-green-400">Message Sent!</h3>
              <p className="text-gray-500 text-sm">We'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
              }}
            >
              <motion.div className="flex flex-col gap-2" variants={fadeUp} custom={0}>
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
              </motion.div>

              <motion.div className="flex flex-col gap-2" variants={fadeUp} custom={1}>
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
              </motion.div>

              <motion.div className="flex flex-col gap-2" variants={fadeUp} custom={2}>
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
              </motion.div>

              <motion.div variants={fadeUp} custom={3}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(74,222,128,0)',
                      '0 0 20px rgba(74,222,128,0.4)',
                      '0 0 0px rgba(74,222,128,0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  {loading
                    ? <><FaSpinner className="animate-spin" /> Sending...</>
                    : 'Send Message'
                  }
                </motion.button>
              </motion.div>

            </motion.form>
          )}
        </motion.div>

      </section>

    </main>
  )
}

export default Contact