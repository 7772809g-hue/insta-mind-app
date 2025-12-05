"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState(
    "I am a female content creator in New York, posting about coffee, vintage fashion, and mindset. Give me 5 Reels ideas."
  );
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    setError("");
    setResult("");

    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Prompt cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Server error: ${res.status}`);
        return;
      }

      const data = await res.json();
      const text = data.result;

      if (!text || typeof text !== "string") {
        setError("Empty response from API.");
        return;
      }

      setResult(text);
    } catch (err) {
      console.error("Request error:", err);
      setError("Network or server error.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "40px", fontWeight: 700, marginBottom: "8px" }}>
        Insta-Mind App
      </h1>
      <p style={{ marginBottom: "24px" }}>
        Generate content ideas for Instagram Reels ✨
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          width: "100%",
          minHeight: "160px",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={isLoading}
        style={{
          marginTop: "16px",
          padding: "10px 24px",
          fontSize: "16px",
          fontWeight: 600,
          borderRadius: "4px",
          border: "1px solid #000",
          backgroundColor: isLoading ? "#888" : "#000",
          color: "#fff",
          cursor: isLoading ? "default" : "pointer",
        }}
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>

      <div
        style={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          minHeight: "80px",
          whiteSpace: "pre-wrap",
        }}
      >
        {error
          ? error
          : result
          ? result
          : "No response yet. Click Generate to get ideas."}
      </div>
    </main>
  );
}
