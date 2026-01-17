
import { GoogleGenAI } from "@google/genai";

export const getPlotConversionAnalysis = async (address: string, currentImpervious: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `For the property at ${address}, Soundview area, Bronx, provide 3 short factual bullet points explaining how replacing asphalt with green space improves storm drainage. Focus on the Bronx River and local creek drainage. Do NOT use introductory phrases like "As an urban planner". Just give the facts. Max 12 words per point.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    return response.text || "Simulation data unavailable.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Hydrological engine timeout. Please retry.";
  }
};
