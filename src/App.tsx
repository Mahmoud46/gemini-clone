import { ReactNode } from "react";
import "./styles/App.module.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App(): ReactNode {
	return (
		<main>
			<Sidebar />
			<Main />
		</main>
	);
}

export default App;
