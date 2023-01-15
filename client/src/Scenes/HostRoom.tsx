import {
	Box,
	Button,
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
import SongRequest from "../Models/songRequest";
import ISongRequest from "../Service/ISongRequest";
import { useStores } from "../Stores/RootStore";
import "./GameRoom.css";

const HostRoom = observer(() => {
	const { roomStore, socketStore } = useStores();

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

			socketStore.socket.on("on-request-song", (req: string) => {
				const { songTitle, videoUrl, singer, id }: ISongRequest =
					JSON.parse(req);
				roomStore.room.addVideo(videoUrl, songTitle, singer, id);
			});
		})();
	}, []);

	return (
		<>
			<Container>
				{roomStore.room.playlist.length > 0 ? (
					<Table>
						<Thead>
							<Tr>
								<Th>Song</Th>
								<Th>Singer</Th>
							</Tr>
						</Thead>
						<Tbody>
							{roomStore.room.playlist.map((req: SongRequest) => (
								<Tr key={req.id}>
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
				<Box>
					<Button onClick={roomStore.room.clearPlaylist} colorScheme="red">
						Clear
					</Button>
				</Box>
			</Container>
		</>
	);
});

export default HostRoom;
