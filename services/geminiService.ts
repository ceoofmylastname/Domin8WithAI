import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAudit = async (businessType: string, challenge: string): Promise<AuditResult> => {
  const modelId = "gemini-2.5-flash"; // Fast model for interactive UI

  const prompt = `
    Act as a world-class business strategist and growth hacker using 'Russell Brunson' style logic.
    The user runs a: ${businessType}.
    Their main challenge is: ${challenge}.

    Provide a "Liquid Growth Audit" that is punchy, high-impact, and leads them towards booking a consultation.
    
    Return a JSON object with:
    1. headline: A magnetic 5-7 word headline describing their potential.
    2. strategy: A 2-sentence summary of the 'Liquid Strategy' to fix their problem.
    3. score: A number between 40 and 85 (create a sense of room for improvement).
    4. steps: An array of 3 short, actionable bullet points (max 6 words each) that we would implement.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            strategy: { type: Type.STRING },
            score: { type: Type.INTEGER },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AuditResult;
    }
    
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Audit Failed:", error);
    // Fallback if API fails or key is missing
    return {
      headline: "Unlock Your Hidden Revenue Stream",
      strategy: "We've identified a liquidity gap in your current funnel. By optimizing your intake, we can increase flow.",
      score: 62,
      steps: ["Optimize Lead Capture", "Automate Follow-up Flow", "High-Ticket Retargeting"]
    };
  }
};