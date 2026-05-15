import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/user/Home'
import Apply from './pages/user/Apply'
import Contact from './pages/user/Contact'
import Internships from './pages/user/Internships'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'


const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>


      <Footer />


    </BrowserRouter>
  )
}

export default App