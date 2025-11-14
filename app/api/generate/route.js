// app/api/generate/route.js
import { NextResponse } from "next/server";
import { openai, DEFAULT_MODEL } from "../../../lib/openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: DEFAULT_MODEL,
      input: `
Ты — эксперт по Instagram-контенту и Reels.
На основе этого описания пользователя сгенерируй 5 идей контента в формате списка:

"${prompt}"
`,
    });

    const text =
      response.output?.[0]?.content?.[0]?.text ??
      "No response from model";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("API /api/generate error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
