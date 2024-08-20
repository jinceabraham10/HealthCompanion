import React from 'react'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import Login from './components/Login'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<RegistrationPage/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
