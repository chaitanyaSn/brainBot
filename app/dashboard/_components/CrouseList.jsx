'use client'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CrouseCard from './CrouseCard'
import { Button } from '@/components/ui/button'
import { RefreshCcwIcon } from 'lucide-react'

const CrouseList = () => {
    const {user}=useUser()
    const [loading,setLoading]=useState(false)
    const [courseList,setCourseList]=useState([])
    useEffect(()=>{
        user&&GetCourse()
    },[user])
    const GetCourse=async()=>{
      setLoading(true)
        const result=await axios.post('/api/courses',{createdBy:user?.primaryEmailAddress?.emailAddress})
        console.log(result.data.result)
        setCourseList(result.data.result)
        setLoading(false)
    }
  return (
    <div className='mt-10'>
      <div className='flex justify-between items-center mb-3'><h2 className='font-bold text-2xl '>Your Study Material</h2>
      <Button variant='outline' onClick={GetCourse}><RefreshCcwIcon/>  Refresh</Button>
      </div>
      
      
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {loading==false?courseList?.map((course,index)=>(
            
                <CrouseCard course={course} key={index}/>
        
        )):[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className='h-56 w-full bg-slate-200 rounded-lg animate-pulse'>

          </div>
        ))
  
          }
      </div>
    </div>
  )
}

export default CrouseList
