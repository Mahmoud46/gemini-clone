import { ReactNode } from "react";
import "./styles/App.module.scss";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";

function App(): ReactNode {
	return (
		<main>
			<Sidebar />
			<Main />
		</main>
	);
}

export default App;
