// app/api/generate/route.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an Instagram content strategist. Generate concise, high-performing content ideas for a US-based audience."
        },
        {
          role: "user",
          content:
            `User description:\n${prompt}\n\nGenerate 5 specific, actionable Reels ideas as a numbered list.`
        }
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    const text =
      completion.choices?.[0]?.message?.content || "No response from model";

    return new Response(
      JSON.stringify({ result: text }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("API /api/generate error:", error);

    return new Response(
      JSON.stringify({
        error: "Server error",
        message: error?.message ?? String(error)
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
