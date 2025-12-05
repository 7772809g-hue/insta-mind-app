// app/api/generate/route.js

import OpenAI from "openai";

// Use latest OpenAI SDK, key is taken from Vercel env: OPENAI_API_KEY
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    // 1. Read JSON body from the request
    const body = await request.json();
    const prompt = body?.prompt;

    // 2. Validate prompt
    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. Call the latest Responses API
    const response = await client.responses.create({
      // можно поменять на "gpt-4.1-mini", если он у тебя уже включён
      model: "gpt-4o-mini",
      input: `
You are an Instagram content strategist.
Generate concise, high-performing content ideas for a US-based audience.

User description:
${prompt}

Task:
Generate 5 specific, actionable Instagram Reels ideas as a numbered list.
Each idea should:
- Be short (1–2 sentences)
- Have a clear hook for the first 3 seconds
- Fit a lifestyle / New York / coffee / fashion / mindset vibe.
      `,
    });

    // 4. Extract plain text from the response (latest SDK helper)
    const text = response.output_text ?? "No response from model";

    // 5. Send back JSON to the frontend
    return new Response(
      JSON.stringify({ result: text }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API /api/generate error:", error);

    return new Response(
      JSON.stringify({
        error: "Server error",
        // аккуратно достаём текст ошибки
        message:
          error && typeof error === "object" && "message" in error
            ? error.message
            : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
