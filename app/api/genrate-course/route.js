import { NextResponse } from "next/server";
import { db } from "@/config/db"; 
import { STUDY_MATERIAL_TABLE } from "@/config/schema";  
import { courseOutline } from "@/config/AiModel";
export async function POST(req) {
    try {
        const { courseId, topic, courseType, createdBy, difficultyLevel } = await req.json();
        
        // Validate difficulty level
        const validDifficultyLevels = ['Beginner', 'Intermediate', 'Pro'];
        if (!validDifficultyLevels.includes(difficultyLevel)) {
            return NextResponse.json({ 
                error: "Invalid difficulty level",
                details: "Difficulty level must be Beginner, Intermediate, or Pro" 
            }, { status: 400 });
        }

        const PROMPT = `Generate study material in detail for ${topic} for ${courseType} and level ${difficultyLevel} with summary of course. List of chapters along with summary of each chapter, topic list in chapter in JSON format.`;
        
        try {
            // AI response using Gemini
            const aiResp = await courseOutline.sendMessage(PROMPT);
            if (!aiResp || !aiResp.response) {
                throw new Error('No response from AI model');
            }

            const responseText = aiResp.response.text();
            if (!responseText) {
                throw new Error('Empty response from AI model');
            }

            const aiResult = JSON.parse(responseText);

            // Database insertion
            try {
                const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
                    courseId,
                    courseType,
                    createdBy,
                    topic,
                    courseLayout: aiResult,
                }).returning();

                return NextResponse.json({ result: dbResult[0] });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return NextResponse.json({ 
                    error: "Database operation failed",
                    details: dbError.message 
                }, { status: 500 });
            }
        } catch (aiError) {
            console.error("AI model error:", aiError);
            return NextResponse.json({ 
                error: "AI model operation failed",
                details: aiError.message 
            }, { status: 500 });
        }
    } catch (error) {
        console.error("General error in POST /api/genrate-course:", error);
        return NextResponse.json({ 
            error: "Request processing failed",
            details: error.message 
        }, { status: 500 });
    }
}
