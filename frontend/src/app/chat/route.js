import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { message } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful ticket support assistant." },
      { role: "user", content: message },
    ],
    stream: false, 
  });
  
  const responseText = completion.choices[0].message.content;
  return NextResponse.json({ response: responseText });
}
