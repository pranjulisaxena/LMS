import connectDB from "../../Server/configs/mongodb.js";
import { clerkWebhooks } from "../../Server/controllers/webhooks.js";

export default async function handler(req, res) {

  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // Connect DB
    await connectDB();

    // Parse body
    const payload =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    console.log("Webhook Event:", payload.type);

    // Call your controller
    return clerkWebhooks({ ...req, body: payload }, res);

  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}