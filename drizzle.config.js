import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url:"postgresql://neondb_owner:nyve7JWK9rQI@ep-jolly-hat-a1y7l1y8.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  },
});
