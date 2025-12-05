"use client";

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState(
    "I am a female content creator in New York, posting about coffee, vintage fashion, and mindset. Give me 5 Reels ideas."
  );
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Server error");
        return;
      }

      setResult(data.result || "Empty response");
    } catch (e) {
      console.error(e);
      setError("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 600,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif"
      }}
    >
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>Insta-Mind App</h1>
      <p style={{ marginBottom: 24 }}>
        Generate content ideas for Instagram Reels ✨
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
        style={{
          width: "100%",
          padding: 10,
          fontSize: 16,
          fontFamily: "inherit",
          boxSizing: "border-box"
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          marginTop: 16,
          padding: "10px 20px",
          fontSize: 16,
          cursor: loading ? "default" : "pointer"
        }}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      <div
        style={{
          marginTop: 24,
          padding: 16,
          background: "#f5f5f5",
          minHeight: 40,
          whiteSpace: "pre-wrap"
        }}
      >
        {error && <span>{error}</span>}
        {!error && result && <span>{result}</span>}
      </div>
    </div>
  );
}
