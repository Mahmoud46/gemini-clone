export interface Chat {
	id: number;
	chat: ChatPart[];
}

export interface ChatPart {
	head: string;
	body: string;
}

export interface ChatRef {
	id: number; // Chat id
	head: string; // Head of the first chat
}

export interface ChatsHistoryPart {
	role: "user" | "model";
	parts: { text: string }[];
}
