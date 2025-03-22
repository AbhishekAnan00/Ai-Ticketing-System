import { GoogleGenerativeAI } from "@google/generative-ai";
import { createTicket } from "../controllers/ticketController";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt = `give me a detailed of ticket user:${createTicket}\n\nTICKET`;
const ticket = [];


const result = await model.generateContent(prompt);
console.log(result.response.text());