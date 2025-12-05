// app/api/generate/route.js
import { NextResponse } from "next/server";
import { client, DEFAULT_MODEL } from "../../../lib/openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Using the latest Responses API
    const response = await client.responses.create({
      model: DEFAULT_MODEL,
      instructions:
        "You are an Instagram content strategist. Generate concise, high-performing content ideas for Reels and posts for a US-based audience.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `User description:\n${prompt}\n\nGenerate 5 specific, actionable content ideas as a numbered list.`
            }
          ]
        }
      ],
      max_output_tokens: 600
    });

    const text = response.output_text ?? "No response from model";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("API /api/generate error:", error);
    return NextResponse.json(
      {
        error: "Server error",
        message: error?.message ?? String(error)
      },
      { status: 500 }
    );
  }
}
