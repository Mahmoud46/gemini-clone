import { Chat } from "./chat.interface";
import { ChatRef } from "./chat.interface";

export default interface ContextDataContent {
	promptInput: string;
	setPromptInput: React.Dispatch<React.SetStateAction<string>>;
	recentPrompt: string;
	setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
	prevPrompt: string;
	setPrevPrompt: React.Dispatch<React.SetStateAction<string>>;
	showResult: boolean;
	setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
	promptLoading: boolean;
	setPromptLoading: React.Dispatch<React.SetStateAction<boolean>>;
	resultData: string;
	setResultData: React.Dispatch<React.SetStateAction<string>>;
	sendPrompt: (prompt: string) => Promise<void>;
	chatsList: ChatRef[];
	setChatsList: React.Dispatch<React.SetStateAction<ChatRef[]>>;
	setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
	chats: Chat[];
	recentChatId: number;
	setRecentChatId: React.Dispatch<React.SetStateAction<number>>;
}
