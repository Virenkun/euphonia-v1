import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey:
    process.env.GROQ_API_KEY ||
    "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",
  dangerouslyAllowBrowser: true,
});
