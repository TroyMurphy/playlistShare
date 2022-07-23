import "./App.css";
import { useState } from "react";
import Landing from "./Scenes/Landing";
import GameRoom from "./Scenes/GameRoom";

function App() {
	const [roomCode, setRoomCode] = useState("");
	return (
		<>
			{roomCode === "" ? (
				<Landing onRoomCode={(rc) => setRoomCode(rc)} />
			) : (
				<GameRoom roomCode={roomCode} />
			)}
		</>
	);
}

export default App;
