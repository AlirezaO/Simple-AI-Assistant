import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const sendMessageToGemini = async (message) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error(
      "Sorry, there was an error processing your request. Please try again later."
    );
  }
};
