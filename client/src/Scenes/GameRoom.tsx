import { useEffect, useState } from "react";
// import GameState from "../../../models/gameState";
// import GameStateJson from "../../../dtos/GameStateJson";
// import PlayerJson from "../../../dtos/PlayerJson";
import { useSocket } from "../Contexts/SocketProvider";

interface IGameRoomProps {
	roomCode: string;
}

function GameRoom({ roomCode }: IGameRoomProps) {
	const { socket, joinRoom } = useSocket();
	// const [gameState, setGameState] = useState<GameState | undefined>();
	// const [socket, setSocket] = useState<Socket>();
	const [lobby, setLobby] = useState<string[]>([]);

	// const handleLobbyUpdate = useCallback((spectators: string[]) => {
	// 	setLobby(spectators);
	// }, []);

	useEffect(() => {
		(async function () {
			await socket.on("members-change", (lobbyists) => {
				console.log("members changed");
				setLobby(lobbyists);
			});

			joinRoom(roomCode);
		})();
	}, [socket, roomCode, joinRoom]);

	return (
		<>
			<h1>Game Room [{roomCode}]</h1>
			<div>
				{lobby.map((x, i) => (
					<p key={i}>{x}</p>
				))}
			</div>
		</>
	);
}

export default GameRoom;
