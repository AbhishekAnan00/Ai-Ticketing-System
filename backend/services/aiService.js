import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API;

export const generateTicketDetails = async (ticketContent) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Provide a detailed explanation for the following ticket: "${ticketContent}"\n\nTICKET:`;
    const result = await model.generateContent(prompt);

    // console.log("Gemini API full response:", result);

    if (result && result.response && typeof result.response.text === "function") {
      const enrichedText = result.response.text();
      console.log("Extracted enriched description:", enrichedText);
      return enrichedText;
    } else {
      console.error("Unexpected Gemini API response format:", result);
      return "";
    }
  } catch (error) {
    console.error("Error in generateTicketDetails:", error);
    return "";
  }
};
