import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useSocket } from "../Contexts/SocketProvider";
import YoutubeSearch from "./YoutubeSearch";
import "./GameRoom.css";
import { useRoomState } from "../Contexts/RoomState";

interface IGameRoomProps {
	roomCode: string;
}

function GameRoom({ roomCode }: IGameRoomProps) {
	const { socket, joinRoom, requestVideo } = useSocket();
	const [lobby, setLobby] = useState<string[]>([]);
	const { room } = useRoomState();

	useEffect(() => {
		(async function () {
			// TODO: Extract to constants
			await socket.on("members-change", (lobbyists) => {
				console.log("members changed");
				setLobby(lobbyists);
			});

			await socket.on("playlist-init", (videoUrls: Array<string>) => {
				console.log("playlist-init");
				room.setPlaylist(videoUrls);
			});

			await socket.on("request-added", (videoUrl: string) => {
				room.addVideo(videoUrl);
			});

			joinRoom(roomCode);
		})();
	}, [socket, roomCode, joinRoom]);

	const onRequest = (video: string) => {
		requestVideo(video);
	};

	return (
		<>
			<Box>
				<h1>Game Room [{roomCode}]</h1>
			</Box>
			<Box>
				<h2>Room [{JSON.stringify(room)}]</h2>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					{room.playlist.map((url: string, i: number) => (
						<p key={"song" + i}>{url}</p>
					))}
				</Grid>
				<Grid item xs={3}>
					<YoutubeSearch onRequest={onRequest} />
				</Grid>

				<Grid item xs={3}>
					<div>
						{lobby.map((x, i) => (
							<p key={"code" + i}>{x}</p>
						))}
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default GameRoom;
