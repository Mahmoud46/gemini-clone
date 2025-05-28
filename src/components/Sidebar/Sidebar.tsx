import { ReactNode, useContext, useState } from "react";
import styles from "./Sidebar.module.scss";
import ContextDataContent from "../../interfaces/context.interface";
import { Context } from "../../context/context";
import { Chat, ChatRef } from "../../interfaces/chat.interface";

type TopProps = {
	isExpanded: boolean;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
	isSideBarOpened: boolean;
};

function RecentChat({
	id,
	head,
	setRecentChatId,
	recentChatId,
	setChats,
	setChatsList,
}: {
	id: number;
	head: string;
	setRecentChatId: React.Dispatch<React.SetStateAction<number>>;
	recentChatId: number;
	setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
	setChatsList: React.Dispatch<React.SetStateAction<ChatRef[]>>;
}): ReactNode {
	const { showResult, setShowResult } = useContext(
		Context
	) as ContextDataContent;

	const showSelectedChat = (chatId: number) => {
		if (!showResult) setShowResult(true);
		setRecentChatId(chatId);
	};

	const deleteChat = (chatId: number) => {
		let newRecentChatId = recentChatId;

		if (chatId == newRecentChatId) {
			newRecentChatId = -1;
			setShowResult(false);
		}

		setChats((prev) => {
			const newChats = prev.filter((chat) => chat.id != chatId);
			return newChats;
		});

		setChatsList((prev) => {
			const newChatsList = prev.filter((chat) => chat.id != chatId);
			return newChatsList;
		});

		setRecentChatId(newRecentChatId);
	};

	return (
		<div
			className={`${styles.recentEntry} ${
				id == recentChatId ? styles.active : ""
			}`}
		>
			<span className="material-symbols-outlined">notes</span>
			<p>{head}</p>
			<i onClick={() => showSelectedChat(id)}></i>
			<span
				className="material-symbols-outlined"
				onClick={() => deleteChat(id)}
			>
				close
			</span>
		</div>
	);
}

function Top(expand: TopProps): ReactNode {
	const {
		setShowResult,
		chatsList,
		setRecentChatId,
		recentChatId,
		setChats,
		setChatsList,
		setIsSideBarOpened,
	} = useContext(Context) as ContextDataContent;

	const expandSideBar = () => {
		if (window.innerWidth <= 960) setIsSideBarOpened(false);
		else expand.setIsExpanded((prev) => !prev);
	};

	const newChat = () => {
		setShowResult(false);
		setRecentChatId(-1);
	};

	return (
		<div className={styles.top}>
			<span
				className={`${styles.menu} material-symbols-outlined`}
				onClick={expandSideBar}
			>
				menu
			</span>
			<div
				className={`${styles.newChat} ${
					recentChatId == -1 ? styles.inactive : ""
				}`}
				onClick={newChat}
			>
				<span className="material-symbols-outlined">add</span>
				{expand.isExpanded && <p>New chat</p>}
			</div>
			{(expand.isExpanded ||
				(expand.isSideBarOpened && window.innerWidth <= 960)) && (
				<div className={styles.recent}>
					<p className={styles.recentTitle}>Recent</p>
					{chatsList.map((chat, index) => (
						<RecentChat
							id={chat.id}
							head={chat.head}
							setRecentChatId={setRecentChatId}
							recentChatId={recentChatId}
							setChats={setChats}
							setChatsList={setChatsList}
							key={index}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function Bottom({
	isExpanded,
	isOpened,
}: {
	isExpanded: boolean;
	isOpened: boolean;
}): ReactNode {
	return (
		<div className={styles.bottom}>
			<div className={`${styles.bottomItem} ${styles.recentEntry}`}>
				<span className="material-symbols-outlined">help</span>
				{(isExpanded || (isOpened && window.innerWidth <= 960)) && <p>Help</p>}
			</div>
			<div className={`${styles.bottomItem} ${styles.recentEntry}`}>
				<span className="material-symbols-outlined">history</span>
				{(isExpanded || (isOpened && window.innerWidth <= 960)) && (
					<p>Activity</p>
				)}
			</div>
			<div className={`${styles.bottomItem} ${styles.recentEntry}`}>
				<span className="material-symbols-outlined">settings</span>
				{(isExpanded || (isOpened && window.innerWidth <= 960)) && (
					<p>Settings</p>
				)}
			</div>
		</div>
	);
}

export default function Sidebar(): ReactNode {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const { isSideBarOpened } = useContext(Context) as ContextDataContent;
	return (
		<div
			className={`${styles.sidebar} ${
				isSideBarOpened && window.innerWidth <= 960 ? styles.open : ""
			}`}
		>
			<Top
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
				isSideBarOpened={isSideBarOpened}
			/>
			<Bottom isExpanded={isExpanded} isOpened={isSideBarOpened} />
		</div>
	);
}
