import { NotebookText } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import MaterialCard from './MaterialCard'
import Link from 'next/link'
import axios from 'axios'

const StudyMaterial = ({courseId}) => {
    const [study,setStudy]=useState()
    const Material=[
        {
            name:'Notes/Chapters',
            desc:'get notes of this chapter in that course',
            icon:<NotebookText/>,
            path:'/notes'

        }
    ]
    useEffect(()=>{
        GetStudyMaterial()
    },[])

    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
            courseId:courseId
        })
        setStudy(result?.data)
    }
  return (
    <div className='mt-5'>
     <h2 className='font-medium text-2xl'>Study Material</h2>
     <div className='grid lg:grid-cols-4 grid-cols-2 mt-3'>
        {Material.map((item,index)=>(
            <Link href={'/course/'+courseId+item.path}>  <MaterialCard item={item} key={index}/></Link>
         
        ))}
     </div>
    </div>
  )
}

export default StudyMaterial
