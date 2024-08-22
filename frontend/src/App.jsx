import React from 'react'
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import Login from './components/Login'
import RegisterationPage from './pages/RegisterationPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<RegisterationPage/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
