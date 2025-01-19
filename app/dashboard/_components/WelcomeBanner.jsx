'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const WelcomeBanner = () => {
    const {user}=useUser()
    console.log(user)
  return (
    <div className='w-full p-5 bg-gradient-to-br from-blue-400 to-indigo-600 text-white rounded-lg'>
     
      <div>
       <h2 className='font-bold text-3xl'>Hello, {user?.fullName}</h2> 
       <p>Welcome ,you are most awaited person</p>
      </div>
    </div>
  )
}

export default WelcomeBanner
