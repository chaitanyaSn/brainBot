'use client'
import React, { useState } from 'react'
import SelectOption from './_components/SelectOption'
import { Button } from '@/components/ui/button'
import TopicInput from './_components/TopicInput'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'



const Create = () => {
  const [step, setStep] = useState(0)
  const {user}=useUser()
  const router=useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    studyType: '',
    topic: '',
    difficultyLevel: ''
  })

  const handleUserInput = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
  }

  const handleSubmit = async() => {
    try {
      setIsLoading(true)
      const courseId = uuidv4()
      const result = await axios.post('/api/genrate-course', {
        courseId,
        courseType: formData.studyType,
        topic: formData.topic,
        difficultyLevel: formData.difficultyLevel,
        createdBy: user.primaryEmailAddress.emailAddress
      })
      
      
      // TODO: Add redirect to course page
      console.log(result.data.result)
    } catch (error) {
      console.error('Error generating course:', error)
      toast.error(error.response?.data?.details || 'Failed to generate course')
    } finally {
      setIsLoading(false)
      router.replace('/dashboard')
    }
  }

  return (
    <div className='flex flex-col items-center p-5 md:px-24 mt-20'>
      <h2 className='font-bold text-4xl text-blue-400'>Start building </h2>
      <p className='text-gray-500 text-lg'>Fill all details</p>
      <div className='mt-10 w-full mx-auto'>
        {step == 0 ? (
          <SelectOption 
            selectedStudytype={(value) => handleUserInput('studyType', value)}
            selectedOption={formData.studyType}
          />
        ) : (
          <TopicInput 
            setTopic={(value) => handleUserInput('topic', value)}
            setDifficultyLevel={(value) => handleUserInput('difficultyLevel', value)}
            topicValue={formData.topic}
            difficultyLevel={formData.difficultyLevel}
          />
        )}
      </div>

      <div className='flex w-full mx-auto justify-between mt-32'>
        {step != 0 ? 
          <Button variant='outline' onClick={() => setStep(step-1)}>Previous</Button> 
          : <div></div>
        }
        {step == 0 ? 
          <Button 
            onClick={() => setStep(step+1)}
            disabled={!formData.studyType}
          >
            Next
          </Button> 
          : 
          <Button 
            onClick={handleSubmit}
            disabled={!formData.topic || !formData.difficultyLevel || isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        }
      </div>
    </div>
  )
}

export default Create