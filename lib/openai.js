// lib/openai.js
import OpenAI from "openai";

export const DEFAULT_MODEL = "gpt-4.1-mini"; // или gpt-4o-mini, важно чтобы модель существовала

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
