'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CrouseCard from './CrouseCard'

const CrouseList = () => {
    const {user}=useUser()
    const [courseList,setCourseList]=useState([])
    useEffect(()=>{
        user&&GetCourse()
    },[user])
    const GetCourse=async()=>{
        const result=await axios.post('/api/courses',{createdBy:user?.primaryEmailAddress?.emailAddress})
        console.log(result.data.result)
        setCourseList(result.data.result)
    }
  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl'>Your Study Material</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {courseList?.map((course,index)=>(
            
                <CrouseCard course={course} key={index}/>
        
        ))}
      </div>
    </div>
  )
}

export default CrouseList
