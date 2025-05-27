import { GoogleGenAI } from "@google/genai";
import { ChatsHistoryPart } from "../interfaces/chat.interface";
export const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY ?? "";

async function* runChat(
	promptHistory: ChatsHistoryPart[]
): AsyncGenerator<string> {
	const ai = new GoogleGenAI({
		apiKey: geminiApiKey,
	});

	const config = {
		thinkingConfig: {
			thinkingBudget: 0,
		},
		responseMimeType: "text/plain",
	};

	const model = "gemini-2.0-flash";

	const contents = promptHistory;

	const response = await ai.models.generateContentStream({
		model,
		config,
		contents,
	});

	for await (const chunk of response) {
		yield chunk.text || "";
	}
}

export default runChat;
