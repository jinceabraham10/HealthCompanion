import React from 'react'
import Login from '../../components/login/Login'
import { useState } from 'react'
import RegisterationPage from '../registeration/RegisterationPage'

function HomePage() {

    const[opened,setOpened]=useState(null)
  return (
    <div className='h-full w-full'>
        <div className='fixed border w-full top-0 p-5 bg-gray-100 z-50'>
            <ul className='none flex flex-row gap-10 mr-40 text-emerald-500 justify-end'>
                <li><button>About</button></li>
                <li><button onClick={()=>{
                    setOpened('login')
                }}>Login</button></li>
            </ul>
        </div>
        <div className='relative mt-10 min-w-full min-h-full'>
            {
                (opened=="login")&& <Login setOpened={setOpened}/>
            }
            {
                (opened=="register")&& <RegisterationPage setOpened={setOpened}/>
            }

        </div>
      
    </div>
  )
}

export default HomePage
