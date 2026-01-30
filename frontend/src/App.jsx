import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import { toast } from 'react-hot-toast'
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"

import { useAuthContext } from './hooks/useAuthContext.js'

function App() {
  const {user}= useAuthContext();
  return (
    <div data-theme="forest">
      {/* <button className="btn btn-primary" onClick={()=>toast.success("ok")}>Click me</button> */}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to= "/login"/> } />
        <Route path="/create" element={user ? <CreatePage /> : <Navigate to= "/login"/> } />
        <Route path="/note/:id" element={user ? <NoteDetailPage /> : <Navigate to= "/login"/> } />

        <Route path="/login" element={!user ? <Login/> : <Navigate to="/" /> }/>
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" /> }/>
      </Routes>
    </div>
  )
}

export default App
