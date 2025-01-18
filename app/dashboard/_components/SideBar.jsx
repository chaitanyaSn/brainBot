"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {  BrainCircuit, LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {
    const path=usePathname()
    const MenuList=[
        {
            name:'DashBoard',
            icon:LayoutDashboard,
            path:'/dashboard'
        },
        {
            name:'Profile',
            icon:UserCircle,
            path:'/dashboard/profile'
        },


    ]
  return (
    <div className=' p-6'>
        <div className='flex items-center'>
            <BrainCircuit size={30} className='text-blue-600'/>
            <h2 className='font-bold text-2xl'>Brain Bot</h2>

        </div>
        <div className='mt-10'>
            <Link href={'/create'}><Button className="w-full bg-blue-500" variant='outline'>+ Create new</Button></Link>
            <div className='mt-5'>
                
                {MenuList.map((menu,index)=>(
                    <div key={index} className={`flex gap-5 items-center p-3 hover:bg-slate-300 rounded-md cursor-pointer mt-2 ${path==menu.path && 'bg-slate-200'}` }>
                        <menu.icon/>
                        <h2>{menu.name}</h2>

                    </div>
                ))}
            </div>
        </div>
        <div className='border p-5 rounded-lg bg-slate-200 absolute bottom-10 w-[80%]'>
            <h2 className='text-lg mb-2'>Available Credits: 5</h2>
            <Progress value={30}/>
            <h2 className='text-sm mb-2'>1 Out of 5 Credit Use</h2>
            <Link href={'/dashboard/upgrade'} className='text-blue-500'>Updrade</Link>
        </div>
     
    </div>
  )
}

export default SideBar
