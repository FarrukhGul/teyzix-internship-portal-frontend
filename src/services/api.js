import axios from 'axios'


// create an axios instance 
const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL || "https://teyzix-internship-portal-backend.onrender.com/api"
    // baseURL : import.meta.env.VITE_API_URL || "http://localhost:3000/api"
})



// token will sent to headers automatically at every req, like we do in postman manually.
API.interceptors.request.use((config)=>{
    //get token from the local storage
    const token = localStorage.getItem('token')

    // check if token exist in LS, then send it to headers
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
});



// Internships
export const getInternships = () => API.get('/internships')
export const getInternshipsById = (id) => API.get(`/internships/${id}`);


// apilications
export const sendApplication = (data) => API.post('/applications', data);


// analyze resume
export const analyzeResume = (id) => API.post(`/admin/applications/${id}/analyze`)


// Admin
export const adminLogin = (data) => API.post('/admin/login', data);
export const adminLogout = () => API.post('/admin/logout');
export const adminGetApplications = () => API.get('/admin/applications');
export const adminAddInternship = (data) => API.post('/admin/internships', data);
export const adminDeleteInternship = (id) => API.delete(`/admin/internships/${id}`);