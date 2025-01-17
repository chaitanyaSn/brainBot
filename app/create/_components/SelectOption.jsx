'use client'
import Image from 'next/image'
import React from 'react'

const SelectOption = ({ selectedStudytype, selectedOption }) => {
  const Options = [
    {
      name: 'exam',
      icon: '/exam_1.png'
    },
    {
      name: 'job interview',
      icon: '/notes.png'
    },
    {
      name: 'practice',
      icon: '/laptop.png'
    },
    {
      name: 'coding prep',
      icon: '/practice.png'
    },
    {
      name: 'other',
      icon: '/content.png'
    }
  ]

  return (
    <div>
      <h2 className='text-center mb-2 text-lg'>For which you want to create personal study material</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
        {Options.map((option, index) => (
          <div 
            key={index} 
            className={`p-4 flex flex-col items-center justify-center border hover:border-blue-500 rounded-xl cursor-pointer
              ${option.name === selectedOption ? 'border-blue-400' : ''}`}
            onClick={() => selectedStudytype(option.name)}
          >
            <Image src={option.icon} height={50} width={50} alt={option.name} />
            <h2 className='text-sm mt-2'>{option.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectOption