// lib/openai.js
import OpenAI from "openai";

// Single shared OpenAI client for the app
export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Default model for content idea generation
export const DEFAULT_MODEL = "gpt-4.1-mini";
// You can change this to "gpt-4o-mini" or "gpt-4.1" later if needed
