import "./App.css";
import Landing from "./Scenes/Landing";
import GameRoom from "./Scenes/GameRoom";
import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoom from "./Scenes/GuestRoom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import { observer } from "mobx-react-lite";

function App() {
	return (
		<ChakraProvider>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/landing" replace />} />
					<Route path="/landing" element={<Landing />} />
					<Route path="/room/:roomCode/guest" element={<GuestRoom />} />
					<Route path="/room/:roomCode/host" element={<GameRoom />} />
				</Routes>
			</main>
		</ChakraProvider>
	);
}

export default observer(App);
