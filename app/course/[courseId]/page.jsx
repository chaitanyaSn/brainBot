'use client'
import DashHeader from '@/app/dashboard/_components/DashHeader'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseIntro from './_components/CourseIntro'
import StudyMaterial from './_components/StudyMaterial'
import ChapterList from './_components/ChapterList'

const CoursePage = () => {
    const {courseId}=useParams()
    const [course,setCourse]=useState()
    useEffect(()=>{
        GetCourse()
    },[])
    const GetCourse=async()=>{
      
        const result=await axios.get('/api/courses?courseId='+courseId)
      setCourse(result.data.result)

    }
    
  return (
    <div>
      <DashHeader/>
      <div className='mx-10 md:mx-36 lg:px-50 mt-10'>
      <CourseIntro course={course}/>
      <StudyMaterial/>
      <ChapterList course={course}/>
      </div>
     
    </div>
  )
}

export default CoursePage
