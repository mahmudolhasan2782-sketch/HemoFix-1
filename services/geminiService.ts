import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// SAFE API KEY RETRIEVAL
// This function prevents the "process is not defined" error which causes white screens
const getApiKey = (): string | undefined => {
  try {
    // 1. Try Vite environment variables (Common for React on Vercel)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
    
    // 2. Try Standard Process environment (Create React App / Next.js)
    if (typeof process !== 'undefined' && process.env) {
       // Check for standard names
       return process.env.REACT_APP_API_KEY || process.env.API_KEY;
    }
  } catch (e) {
    // If accessing these fails, just return undefined (Demo Mode)
    console.warn("Environment access failed, switching to Demo Mode");
  }
  return undefined;
};

const apiKey = getApiKey();
// Force demo mode if no key is found
const isDemoMode = !apiKey || apiKey.length === 0;

let ai: GoogleGenAI | null = null;

// Only initialize if we have a valid key
if (!isDemoMode && apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey: apiKey });
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
    // Fallback to demo mode if initialization fails
  }
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
  
  // DEMO MODE / SAFETY CHECK
  if (isDemoMode || !ai) {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `### ⚠️ ডেমো মোড সক্রিয় (Vercel Deployment)

আপনার ওয়েবসাইটটি **সফলভাবে ডিপ্লয়** হয়েছে! 🎉 এখন আপনি কোনো এরর ছাড়াই সাইটটি দেখতে পাচ্ছেন।

**বর্তমানে এটি ডেমো মোডে আছে কারণ:**
আপনার Vercel প্রজেক্টে এখনো \`API_KEY\` সেট করা হয়নি।

**কিভাবে লাইভ করবেন?**
1. Vercel ড্যাশবোর্ডে যান।
2. Settings > Environment Variables-এ যান।
3. **Key:** \`VITE_API_KEY\` (অথবা \`REACT_APP_API_KEY\`)
4. **Value:** [আপনার Gemini API Key]
5. Save করে নতুন ডিপ্লয়মেন্ট দিন।

**নমুনা উত্তর (ডেমো):**
আমি আপনার ইনপুট পেয়েছি: "${prompt.substring(0, 20)}..."। এটি ঠিক করার জন্য কোডটি চেক করুন।`;
  }

  try {
    const parts: any[] = [];
    
    // Add image if present
    if (base64Image) {
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
        temperature: 0.7,
      }
    });

    return response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "একটি প্রযুক্তিগত ত্রুটি হয়েছে। অনুগ্রহ করে আপনার API Key যাচাই করুন।";
  }
};

export const generateErrorTags = async (errorDescription: string): Promise<string[]> => {
    if (isDemoMode || !ai) {
        return ['Demo', 'System', 'Deployed'];
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze this error and give me 3 short technical tags. Return ONLY tags. Error: ${errorDescription}`,
        });
        const text = response.text || "";
        return text.split(',').map(t => t.trim()).slice(0, 3);
    } catch (e) {
        return ['Error', 'Unknown'];
    }
}