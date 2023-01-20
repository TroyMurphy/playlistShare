import { CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	Heading,
	IconButton,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RoomState } from "../Models/Room";
import SongRequest from "../Models/songRequest";
import { useStores } from "../Stores/RootStore";

const HostRoom = observer(() => {
	const { roomStore, socketStore } = useStores();
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		socketStore.tryHost();
	}, [socketStore]);

	if (roomStore.room.state === RoomState.TOO_MANY_HOSTS) {
		toast({
			title: "Room already hosted",
			description: "An error occured. You cannot host this room",
			status: "error",
			duration: 4000,
			isClosable: true,
		});
		roomStore.clearRoomCode();
		navigate("/landing");
	}

	const onRemove = (id: string) => {
		roomStore.room.removeVideo(id);
	};

	return (
		<>
			<Box textAlign="center" py={10}>
				<Heading as="h2" size="md" fontStyle={"italic"}>
					Room code:
				</Heading>
				<Heading as="h2" size="4xl" colorScheme="blue">
					{roomStore.roomCode}
				</Heading>
			</Box>
			<Container>
				{roomStore.room.playlist.length > 0 ? (
					<Table>
						<Thead>
							<Tr>
								<Th>Song</Th>
								<Th>Singer</Th>
								<Th />
							</Tr>
						</Thead>
						<Tbody>
							{roomStore.room.playlist.map((req: SongRequest) => (
								<Tr key={req.id}>
									<Td>{req.songTitle}</Td>
									<Td>{req.singer}</Td>
									<Td>
										<IconButton
											onClick={() => onRemove(req.id)}
											size="xs"
											aria-label="Remove"
											icon={<CloseIcon />}
										/>
									</Td>
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
