import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { adminLogin } from '../../services/api'
import { FaSpinner } from 'react-icons/fa'
import { RiAdminFill } from 'react-icons/ri'
import { MdVisibility, MdVisibilityOff, MdArrowBack } from 'react-icons/md'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await adminLogin(formData)
      localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="text-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Back to Home */}
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition text-sm mb-8 w-fit"
        >
          <MdArrowBack />
          Back to Home
        </Link>

        {/* Logo/Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-full p-5 mb-4">
            <RiAdminFill className="text-green-400 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold">Admin <span className="text-green-400">Login</span></h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to access the admin dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-[#111] border border-green-900/30 rounded-2xl p-8">

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="admin"
                className="bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-green-900/30 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-400 transition"
                >
                  {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? <><FaSpinner className="animate-spin" /> Signing in...</>
                : 'Sign In'
              }
            </button>

            <div>
              <h1 className='text-gray-400 font-light text-center'>Demo: Username =  admin, Password = admin123</h1>
            </div>

          </form>
        </div>

      </div>
    </main>
  )
}

export default AdminLogin