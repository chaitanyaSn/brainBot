import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const CrouseCard = ({course}) => {
  return (
    <div className='border p-4 rounded-md shadow-md hover:shadow-blue-200'>
      <div >
        <div className='flex justify-between items-center'>
            <Image src={'/notes.png'} alt='other' width={50} height={50}/>
            <h2 className='p-1 px-1 text-[10px] rounded-md'>2025</h2>
        </div>
        <h2 className='mt-3 font-medium text-lg'>{course?.topic}</h2>
        <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.courseSummary}</p>
        <div>
            <Button className='flex justify-end mt-3'>view</Button>
        </div>
      </div>
    </div>
  )
}

export default CrouseCard
