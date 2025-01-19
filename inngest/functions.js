import { genrateNotes } from "@/config/AiModel";
import { inngest } from "./client";
import { db } from "@/config/db";
import { CHAPTER_NOTES_TABLE, USER_Table, STUDY_MATERIAL_TABLE } from "@/config/schema";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data;
    const result = await step.run(
      "check user and create new if not in db",
      async () => {
        const email = user?.primaryEmailAddress?.emailAddress;
        const name = user?.fullName || "Anonymous";

        if (!email) {
          return;
        }

        const result = await db
          .select()
          .from(USER_Table)
          .where(eq(USER_Table.email, email));

        if (result?.length === 0) {
          const userRes = await db
            .insert(USER_Table)
            .values({
              name,
              email,
            })
            .returning({ id: USER_Table.id });
          return userRes;
        }
        return result;
      }
    );
    return "success";
  }
);

export const GenrateNotes = inngest.createFunction(
  { id: "genrate-course", 
    retries: 3 // Add retries for reliability
  },
  { event: "notes.genrate" },
  async ({ event, step }) => {
    const { course } = event.data;
    
    const notesResult = await step.run('Generate chapter notes', async () => {
      const chapters = course?.courseLayout?.chapters;
      if (!chapters || !Array.isArray(chapters)) {
        throw new Error('No chapters found in course layout');
      }

      // Process one chapter at a time
      const chapter = chapters[0];
      await step.run('Generate notes for chapter', async () => {
        const PROMPT = 'Generate exam material detail content for each chapter. Make sure to include all topic points in the content and give content in the form of HTML format(do not add html,head,body,title tag). The chapters: ' + JSON.stringify(chapter);
        
        try {
          const result = await genrateNotes.sendMessage(PROMPT);
          const airResp = result.response.text();

          await db.insert(CHAPTER_NOTES_TABLE).values({
            chapterId: 0,
            courseId: course?.courseId,
            notes: airResp
          });

          // If there are more chapters, trigger next chapter generation
          if (chapters.length > 1) {
            await inngest.send({
              name: "notes.genrate",
              data: {
                course: {
                  ...course,
                  courseLayout: {
                    ...course.courseLayout,
                    chapters: chapters.slice(1) // Remove the first chapter
                  }
                }
              }
            });
          } else {
            // All chapters are done, update course status
            await db.update(STUDY_MATERIAL_TABLE)
              .set({ status: 'Ready' })
              .where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
          }
        } catch (error) {
          console.error('Error generating notes:', error);
          throw error; // Let Inngest retry
        }
      });

      return 'Completed chapter';
    });

    return { notesResult };
  }
);