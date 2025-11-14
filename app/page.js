"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    try {
      setLoading(true);
      setResult("");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) {
        setResult("Ошибка: " + data.error);
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setResult("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Insta-Mind App</h1>
      <p>Сгенерируй идеи для Reels ✨</p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="4"
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
        placeholder="Напиши описание себя или своего Instagram..."
      />

      <button
        onClick={generate}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {loading ? "Генерирую..." : "Сгенерировать"}
      </button>

      <div
        style={{
          whiteSpace: "pre-wrap",
          background: "#f3f3f3",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {result}
      </div>
    </div>
  );
}
