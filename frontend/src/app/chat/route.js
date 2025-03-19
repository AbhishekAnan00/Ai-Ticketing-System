import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { message } = await req.json();
  // Instantiate the OpenAI client (ensure OPENAI_API_KEY is in your .env.local)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  // Create a chat completion using a system prompt
  const completion = await openai.chat.completions.create({
    model: "gpt-4o", // or your chosen model
    messages: [
      { role: "system", content: "You are a helpful ticket support assistant." },
      { role: "user", content: message },
    ],
    stream: false, // set true if you want streaming (handle stream accordingly)
  });
  
  // Extract text from response and send back
  const responseText = completion.choices[0].message.content;
  return NextResponse.json({ response: responseText });
}
