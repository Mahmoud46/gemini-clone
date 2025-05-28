// use createContext hook
import { ReactNode, useState } from "react";
import runChat from "../config/gemini.config.ts";
import { Context } from "./context.tsx";
import ContextDataContent from "../interfaces/context.interface";
import {
	ChatsHistoryPart,
	Chat,
	ChatPart,
	ChatRef,
} from "../interfaces/chat.interface.ts";

export default function ContextProvider({ children }: { children: ReactNode }) {
	// Declare some state variables
	const [promptInput, setPromptInput] = useState<string>("");
	const [recentPrompt, setRecentPrompt] = useState<string>("");
	const [prevPrompt, setPrevPrompt] = useState<string>("");
	const [showResult, setShowResult] = useState<boolean>(false);
	const [promptLoading, setPromptLoading] = useState<boolean>(false);
	const [resultData, setResultData] = useState<string>("");
	const [chatsList, setChatsList] = useState<ChatRef[]>([]);
	const [chats, setChats] = useState<Chat[]>([]);
	const [recentChatId, setRecentChatId] = useState<number>(-1);
	const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(false);

	const handleChatHistory = (prompt: string): ChatsHistoryPart[] => {
		const chatId: number = chats.findIndex((chat) => chat.id == recentChatId);
		const chatHistoryContent: ChatsHistoryPart[] = [];

		if (chatId == -1)
			// recentChatId -1
			return [{ role: "user", parts: [{ text: prompt }] }];

		const chat: ChatPart[] = chats[chatId].chat;
		for (let index = 0; index < chat.length; index++) {
			chatHistoryContent.push({
				role: "user",
				parts: [{ text: chat[index].head }],
			});
			chatHistoryContent.push({
				role: "model",
				parts: [{ text: chat[index].body }],
			});
		}
		// Add the prompt
		chatHistoryContent.push({
			role: "user",
			parts: [{ text: prompt }],
		});

		return chatHistoryContent;
	};

	const sendPrompt = async (prompt: string) => {
		setResultData("");
		setPromptLoading(true);
		setShowResult(true);
		setRecentPrompt(prompt);
		let newRecentId = recentChatId;
		const newChats = chats;
		let result: string = "";

		try {
			for await (const chunk of runChat(handleChatHistory(prompt))) {
				result += chunk;
				setResultData(result);
			}
		} catch (error) {
			result += "\n";
			result += "\n";
			result += "## The model is overloaded. Please try again later.";
			console.log(error);
			setResultData(result);
		}

		const chatPart: ChatPart = { head: prompt, body: result };

		if (newRecentId === -1) {
			// New Chat
			if (newChats.length === 0) newRecentId = 1;
			else newRecentId = newChats[newChats.length - 1].id + 1;

			newChats.push({ id: newRecentId, chat: [chatPart] });
			setChatsList([
				...chatsList,
				{
					id: newRecentId,
					head: prompt.length >= 20 ? `${prompt.substring(0, 20)}...` : prompt,
				},
			]);
		} else {
			// Not a new chat
			const chatIndex = newChats.findIndex((chat) => chat.id == newRecentId);
			newChats[chatIndex].chat.push(chatPart);
		}

		setChats(newChats);
		setRecentChatId(newRecentId);
		setPromptLoading(false);
		setPromptInput("");
	};

	const contextValue: ContextDataContent = {
		promptInput,
		setPromptInput,
		recentPrompt,
		setRecentPrompt,
		prevPrompt,
		setPrevPrompt,
		showResult,
		setShowResult,
		promptLoading,
		setPromptLoading,
		resultData,
		setResultData,
		sendPrompt,
		chats,
		setChats,
		chatsList,
		setChatsList,
		recentChatId,
		setRecentChatId,
		isSideBarOpened,
		setIsSideBarOpened,
	};

	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
