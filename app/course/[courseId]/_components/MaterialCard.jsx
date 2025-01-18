import { Button } from '@/components/ui/button'
import React from 'react'

const MaterialCard = ({item}) => {
  return (
    <div className='border p-6 rounded-md flex flex-col'>
        <div className='flex items-center gap-1 justify-center'>
       <div className='text-blue-500'>{item.icon}</div> 
        <h2 className='font-medium text-xl'>{item.name}</h2>
        </div>
        <p className='text-gray-500 mt-3 text-center'>{item.desc}</p>
        <Button variant="outline" className="mt-3">View</Button>
 
    </div>
  )
}

export default MaterialCard
