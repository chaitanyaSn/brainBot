import { inngest } from "./client";

import { db } from "@/config/db"
import { USER_Table } from "@/config/schema"
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
    const {user}=event.data
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

        console.log(result);

        if (result?.length == 0) {
          const userRes = await db
            .insert(USER_Table)
            .values({
              name,
              email,
            })
            .returning({ id: USER_Table.id });
            return userRes
        }
        return result
      }
    );
    return "success";
  }
);
