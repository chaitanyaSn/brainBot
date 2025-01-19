import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { CreateNewUser, GenrateNotes, helloWorld } from "@/inngest/functions";

// Remove the edge runtime
export const runtime = 'nodejs';
// Set to maximum allowed for hobby plan
export const maxDuration = 60;

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  streaming: 'allow',
  functions: [
    helloWorld,
    CreateNewUser,
    GenrateNotes
  ],
});
