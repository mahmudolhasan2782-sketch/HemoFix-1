import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the API client
// We safely handle the absence of an API key for Demo/Deployment purposes.
const apiKey = process.env.API_KEY;
const isDemoMode = !apiKey || apiKey.length === 0;

let ai: GoogleGenAI | null = null;
if (!isDemoMode && apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
}

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are HemoFix, an advanced AI error resolution assistant created by Hemontu Incorporation.
Your primary language is Bengali, but you can understand English code and errors perfectly.

Your goals:
1. Identify errors from text descriptions, code snippets, or images (OCR).
2. Provide step-by-step, easy-to-understand solutions in Bengali.
3. Be friendly, professional, and explain *why* the error happened (Educational/Self-learning aspect).
4. If an image is provided, analyze it thoroughly for error messages or visual bugs.

Tone: Professional, Helpful, Encouraging.
Format: Use Markdown for code blocks and bold text for emphasis.
`;

export const sendMessageToGemini = async (
  prompt: string,
  base64Image?: string,
  mimeType: string = 'image/png'
): Promise<string> => {
  // DEMO MODE HANDLING: Allows deployment without crashing if no key is provided
  if (isDemoMode || !ai) {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `### ⚠️ ডেমো মোড সক্রিয়

দুঃখিত, বর্তমানে সিস্টেমে **Gemini API Key** কনফিগার করা নেই, তাই আমি লাইভ এআই উত্তর দিতে পারছি না। তবে আপনার অ্যাপটি সফলভাবে ডিপ্লয় হয়েছে! 🎉

**কিভাবে লাইভ করবেন?**
1. Vercel ড্যাশবোর্ডে যান।
2. Settings > Environment Variables-এ যান।
3. **Key:** \`API_KEY\` এবং **Value:** [আপনার Gemini API Key] দিয়ে সেভ করুন।
4. এরপর নতুন করে ডিপ্লয় করলে এটি কাজ করবে।

**নমুনা সমাধান (ডেমো):**
আপনার ইনপুট বিশ্লেষণ করে মনে হচ্ছে এটি একটি সাধারণ কনফিগারেশন ত্রুটি।
\`\`\`javascript
// উদাহরণ কোড
const app = "HemoFix Running Successfully!";
console.log(app);
\`\`\`
`;
  }

  try {
    const parts: any[] = [];
    
    // Add image if present
    if (base64Image) {
      // Remove data URL prefix if present for the API call
      const base64Data = base64Image.split(',')[1] || base64Image;
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
    }

    // Add text prompt
    parts.push({ text: prompt });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance between creativity and precision
      }
    });

    return response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "একটি প্রযুক্তিগত ত্রুটি হয়েছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ বা API Key যাচাই করুন।";
  }
};

export const generateErrorTags = async (errorDescription: string): Promise<string[]> => {
    // Return mock tags in demo mode
    if (isDemoMode || !ai) {
        return ['Demo', 'System', 'No-API'];
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this error and give me 3 short technical tags (e.g., Python, SyntaxError, Database) separated by commas. Return ONLY the tags. Error: ${errorDescription}`,
        });
        const text = response.text || "";
        return text.split(',').map(t => t.trim()).slice(0, 3);
    } catch (e) {
        return ['Error', 'Unknown'];
    }
}