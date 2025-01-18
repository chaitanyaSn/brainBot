import { db } from "@/config/db";
import { STUDY_MATERIAL_TABLE } from "@/config/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {createdBy}=await req.json()
    const result=await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.createdBy,createdBy)).orderBy(desc(STUDY_MATERIAL_TABLE.id))
    return NextResponse.json({result:result})
}

export async function GET(req){
    const reqURL=req.url;
    const {searchParams}=new URL(reqURL)
    const courseId=searchParams?.get('courseId')
    const course=await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE?.courseId,courseId))
    return NextResponse.json({result:course[0]})
}