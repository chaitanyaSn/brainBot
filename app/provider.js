"use client"

import { db } from "@/config/db"
import { USER_Table } from "@/config/schema"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { eq } from "drizzle-orm"
import { useEffect } from "react"

const Provider = ({children}) => {
  const {user}=useUser()
  useEffect(()=>{
    checkIsNewUser()
  },[user])

  const checkIsNewUser=async()=>{
    // const email = user?.primaryEmailAddress?.emailAddress;
    // const name = user?.fullName || "Anonymous";

    // if (!email) {
    //   return;
    // }

    // const result=await db.select().from(USER_Table)
    // .where(eq(USER_Table.email,email))

    // console.log(result)

    // if(result?.length==0){
    //   const userRes=await db.insert(USER_Table).values({
    //     name,
    //     email
    //   }).returning({id:USER_Table.id})

    //   console.log(userRes)
    // }
    const resp=await axios.post('/api/create-user',{user:user})
    console.log(resp.data)

  }

  return (
    <div>
      {children}
    </div>
  )
}

export default Provider
