import { NotebookText } from 'lucide-react'
import React from 'react'
import MaterialCard from './MaterialCard'

const StudyMaterial = () => {
    const Material=[
        {
            name:'Notes/Chapters',
            desc:'get notes of this chapter in that course',
            icon:<NotebookText/>,
            paht:'/notes'

        }
    ]
  return (
    <div className='mt-5'>
     <h2 className='font-medium text-2xl'>Study Material</h2>
     <div className='grid lg:grid-cols-4 grid-cols-2 mt-3'>
        {Material.map((item,index)=>(
           <MaterialCard item={item}/>
        ))}
     </div>
    </div>
  )
}

export default StudyMaterial
