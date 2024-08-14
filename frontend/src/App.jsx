import React from 'react'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import Login from './components/Login'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
