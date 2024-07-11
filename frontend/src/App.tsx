
import './App.css'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Blogs } from './pages/blogs'
import { Publish } from './pages/publish'
function App() {
  return (
    <>
     <BrowserRouter>
       <Routes>
       <Route path="/" element={<Navigate to="/signup" />} />
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/signin' element={<Signin/>}/>
         <Route path='/blogs' element={<Blogs/>}/>
         <Route path="/blog/:id" element={<Blog/>}/>
         <Route path="/publish" element={<Publish/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
