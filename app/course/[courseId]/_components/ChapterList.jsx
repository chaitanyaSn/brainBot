import React from 'react'

const ChapterList = ({course}) => {
    const cha=course?.courseLayout?.chapters
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl'>Chapters:</h2>
      <div className='mt-3'>
        {cha?.map((chapter,index)=>(
            <div className='border shadow-md rounded-md p-4 mb-3'>
                <h2 className='font-bold text-lg'>{chapter.chapterTitle}</h2>
                <p className='text-slate-500'>{chapter.summary}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterList
