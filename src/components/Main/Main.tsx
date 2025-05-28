import { ReactNode, useContext, useState } from "react";
import styles from "./Main.module.scss";
import userIcon from "../../assets/user_icon.jpg";
import { Context } from "../../context/context";
import ContextDataContent from "../../interfaces/context.interface";
import geminiIcon from "../../assets/gemini_icon.png";
import { marked } from "marked";

interface CardInterface {
	message: string;
	icon: string;
}

type CardProps = {
	message: string;
	icon: string;
	setPromptInput: React.Dispatch<React.SetStateAction<string>>;
};

type ChatConstProps = {
	head: string;
	body: string;
};
function ChatStructure(chat: ChatConstProps): ReactNode {
	const [copied, setCopied] = useState(false);

	const copyResponse = async () => {
		setCopied(true);

		setTimeout(() => {
			setCopied(false);
		}, 1000);

		await navigator.clipboard.writeText(chat.body);
	};

	return (
		<div className={styles.chat}>
			<div className={styles.resultTitle}>
				<img src={userIcon} alt="" />
				<p>{chat.head}</p>
			</div>
			<div className={styles.resultData}>
				<img src={geminiIcon} alt="" />
				<p dangerouslySetInnerHTML={{ __html: marked(chat.body) }}></p>
			</div>
			<button className={styles.copyResponseBtn} onClick={copyResponse}>
				<span className={`material-symbols-outlined ${styles.copyIcon}`}>
					{!copied ? "content_copy" : "check"}
				</span>
				{copied ? <span>Copied</span> : <span></span>}
			</button>
		</div>
	);
}

function Card(card: CardProps): ReactNode {
	return (
		<div
			className={styles.card}
			onClick={() => card.setPromptInput(card.message)}
		>
			<p>{card.message}</p>
			<span className="material-symbols-outlined">{card.icon}</span>
		</div>
	);
}

export default function Main(): ReactNode {
	const {
		sendPrompt,
		recentPrompt,
		showResult,
		promptLoading,
		resultData,
		setPromptInput,
		promptInput,
		chats,
		recentChatId,
		setShowResult,
		setRecentChatId,
		setIsSideBarOpened,
		isSideBarOpened,
	} = useContext(Context) as ContextDataContent;

	const cards: CardInterface[] = [
		{
			message: "Suggest beautiful places to see on an upcoming road trip",
			icon: "explore",
		},
		{
			message: "Briefly summarize this concept: urban planning",
			icon: "lightbulb",
		},
		{
			message: "Brainstorm team bonding activities for out work retreat",
			icon: "chat_bubble",
		},
		{
			message: "Improve the readability of the following code",
			icon: "code",
		},
	];

	const newChat = () => {
		setShowResult(false);
		setRecentChatId(-1);
	};

	return (
		<div className={styles.main}>
			<nav>
				<div className={styles.left}>
					<button
						onClick={() => {
							setIsSideBarOpened(!isSideBarOpened);
						}}
					>
						<span className="material-symbols-outlined">menu</span>
					</button>

					<button
						className={`${styles.newChat} ${
							recentChatId == -1 ? styles.inactive : ""
						}`}
						onClick={newChat}
					>
						<span className="material-symbols-outlined">add</span>
						<p>New chat</p>
					</button>
					<p>Gemini</p>
				</div>
				<img src={userIcon} alt="" />
			</nav>

			<div className={styles.mainContainer}>
				{!showResult && (
					<>
						<div className={styles.greet}>
							<p>
								<span>Hello, Mahmoud</span>
							</p>
							<p>How can i help you today?</p>
						</div>
						<div className={styles.cards}>
							{cards.map((card, index) => (
								<Card
									message={card.message}
									icon={card.icon}
									setPromptInput={setPromptInput}
									key={index}
								/>
							))}
						</div>
					</>
				)}
				{showResult && (
					<>
						<div className={styles.result}>
							{chats.map((chat) =>
								chat.id == recentChatId ? (
									chat.chat.map((c) => (
										<ChatStructure head={c.head} body={c.body} />
									))
								) : (
									<></>
								)
							)}
						</div>
						{promptLoading && (
							<div className={styles.result}>
								<div className={styles.resultTitle}>
									<img src={userIcon} alt="" />
									<p>{recentPrompt}</p>
								</div>
								<div className={styles.resultData}>
									<img
										src={geminiIcon}
										alt=""
										className={promptLoading ? `${styles.loading}` : ""}
									/>
									<p
										dangerouslySetInnerHTML={{ __html: marked(resultData) }}
									></p>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			<div className={styles.mainBottom}>
				<div className={styles.searchBox}>
					<input
						onChange={(e) => setPromptInput(e.target.value)}
						value={promptInput}
						type="text"
						placeholder="Enter a prompt here"
					/>
					<div>
						{promptInput && (
							<span
								className={`material-symbols-outlined ${
									promptLoading ? `${styles.loading}` : ""
								}`}
								onClick={() => sendPrompt(promptInput)}
							>
								{promptLoading ? "stop_circle" : "send"}
							</span>
						)}
					</div>
				</div>

				<p className={styles.bottomInfo}>
					Gemini may display inaccurate info, including about people, so
					double-check its results
				</p>
			</div>
		</div>
	);
}
