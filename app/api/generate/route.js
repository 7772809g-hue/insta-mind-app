import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an Instagram strategist. Generate short, actionable Reels ideas for a US audience.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 400,
    });

    const text =
      completion.choices?.[0]?.message?.content?.trim() || "No response from model.";

    // 🔴 ВАЖНО: всегда отправляем поле result
    return Response.json({ result: text }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
