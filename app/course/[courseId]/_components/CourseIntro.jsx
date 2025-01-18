import Image from 'next/image'
import React from 'react'

const CourseIntro = ({course}) => {
  return (
    <div className='flex items-center p-8 rounded-lg shadow-md gap-4'>
      
      <Image src={'/practice.png'} alt='other' height={90} width={90}/>
      <div>
        <h2 className='font-bold text-2xl'>{course?.courseLayout.courseTitle}</h2>
        <p className='text-slate-500 '>{course?.courseLayout.courseSummary}</p>
        <h2 className='mt-3 text-lg text-blue-400'>Total chapters:{course?.courseLayout.chapters.length}</h2>
      </div>
    </div>
  )
}

export default CourseIntro
