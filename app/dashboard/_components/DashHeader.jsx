import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashHeader = () => {
  return (
    <div className='p-5 shadow-md flex justify-end'>
      <UserButton/>
    </div>
  )
}

export default DashHeader
