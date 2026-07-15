import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}
const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.AUTH_DB_NAME || "the_literary_nook_user");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true,
      },
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
