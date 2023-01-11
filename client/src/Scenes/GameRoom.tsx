import {
	Box,
	Container,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRoomStore } from "../Contexts/RoomState";
import { useSocket } from "../Contexts/SocketProvider";
import SongRequest from "../Models/songRequest";
import "./GameRoom.css";

function GameRoom() {
	const { socket, joinRoom } = useSocket();

	const { room } = useRoomStore();
	const { roomCode } = useParams();

	useEffect(() => {
		(async function () {
			// // TODO: Extract to constants
			// await socket.on("members-change", (lobbyists) => {
			// 	console.log("members changed");
			// 	setLobby(lobbyists);
			// });

			// await socket.on("playlist-init", (videoUrls: Array<string>) => {
			// 	console.log("playlist-init");
			// 	room.setPlaylist(videoUrls);
			// });

			await socket.on("request-added", (videoUrl: string) => {
				room.addVideo(videoUrl);
			});

			joinRoom(roomCode as string);
		})();
	}, [socket, roomCode, joinRoom, room]);

	return (
		<>
			<Box>
				<p>{socket.id}</p>
				<h1>Game Room [{roomCode}]</h1>
			</Box>
			<Box>
				<h2>Room [{JSON.stringify(room)}]</h2>
			</Box>
			{/* <Grid gap={2}>
				<GridItem w={10}>
					{room.playlist.map((url: string, i: number) => (
						<p key={"song" + i}>{url}</p>
					))}
				</GridItem>
			</Grid> */}
			<Container>
				{room.playlist.length > 0 ? (
					<Table>
						<Thead>
							<Th>Song</Th>
							<Th>Singer</Th>
						</Thead>
						<Tbody>
							{room.playlist.map((req: SongRequest) => (
								<Tr key={crypto.randomUUID()}>
									<Td>{req.songTitle}</Td>
									<Td>{req.singer}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				) : (
					<Box>
						<Text>Nothing here yet!</Text>
					</Box>
				)}
			</Container>
		</>
	);
}

export default observer(GameRoom);
