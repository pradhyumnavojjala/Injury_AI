import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) return NextResponse.json({ text: "API Key Missing" }, { status: 500 });

    /** * 2026 REPAIR: 
     * We are switching to the 'gemini-2.5-flash' stable ID.
     * Note: 'gemini-1.5' is legacy/retired in many regions as of April 2026.
     */
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `System: Act as CureLens AI. 
            Instruction: End every message with [METADATA] {"risk": "Low", "inflammation": 10} [/METADATA]
            User Query: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // If 2.5 fails, it's likely a key restriction. Let's try the ultra-compatible flash-lite.
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const fallbackData = await fallbackRes.json();
      
      if (!fallbackRes.ok) throw new Error(fallbackData.error?.message || "Model Not Found");
      
      const aiText = fallbackData.candidates[0].content.parts[0].text;
      return NextResponse.json({ text: aiText });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: aiText });

  } catch (error: any) {
    console.error("2026_MODEL_ERROR:", error.message);
    return NextResponse.json({ 
      text: "Neural Link Error: " + error.message 
    }, { status: 500 });
  }
}