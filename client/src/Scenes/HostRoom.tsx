import parse from "html-react-parser";
import { CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
	AspectRatio,
	Box,
	Button,
	Center,
	Container,
	Heading,
	HStack,
	IconButton,
	Link,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoomState } from "../Models/Room";
import SongRequest from "../Models/songRequest";
import { useStores } from "../Stores/RootStore";
import YoutubePlayer from "../Components/YoutubePlayer";
import { YouTubeEvent } from "react-youtube";
import YoutubeService from "../Service/YoutubeService";

const HostRoom = observer(() => {
	const { roomStore, socketStore } = useStores();
	const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
	const toast = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		socketStore.tryHost();
	}, [socketStore]);

	if (roomStore.room.state === RoomState.TOO_MANY_HOSTS) {
		toast({
			title: "Room already hosted",
			description: "An error occurred. You cannot host this room",
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

	useEffect(() => {
		setActiveVideoId(roomStore.room.activeSongId);
	}, [roomStore.room.activeSongId]);

	const handleStateChange = (e: YouTubeEvent<number>) => {
		console.dir(e);
		if (e.data === 0) {
			roomStore.room.popSong();
		}
	};

	return (
		<VStack justify="center">
			<Box textAlign="center" py={10}>
				<Heading as="h2" size="md" fontStyle={"italic"}>
					Room code:
				</Heading>
				<Heading as="h2" size="4xl" colorScheme="blue">
					{roomStore.roomCode}
				</Heading>
			</Box>
			<Center>
				{roomStore.room.hasSongs ? (
					<VStack>
						<AspectRatio ratio={640 / 390} width="300px">
							<YoutubePlayer
								opts={{ width: "640", height: "390" }}
								videoId={activeVideoId}
								onStateChange={handleStateChange}
							/>
						</AspectRatio>
						<Link
							href={`${YoutubeService.YOUTUBE_WATCH_URL}${activeVideoId}}`}
							isExternal
						>
							<span>Go to YouTube </span>
							<ExternalLinkIcon />
						</Link>
					</VStack>
				) : (
					<AspectRatio ratio={640 / 390} width="300px">
						<Box backgroundColor="grey">
							<Center>YouTube</Center>
						</Box>
					</AspectRatio>
				)}
			</Center>
			<Container pt={5}>
				<Table>
					<Thead>
						<Tr>
							<Th>Song</Th>
							{/* <Th>Url</Th> */}
							<Th>Singer</Th>
							<Th />
						</Tr>
					</Thead>
					<Tbody>
						{!roomStore.room.hasSongs && (
							<Tr>
								<Td colSpan={4}>Join the room to request songs!</Td>
							</Tr>
						)}
						{roomStore.room.playlist.map((req: SongRequest) => (
							<Tr key={req.id}>
								<Td>{parse(req.songTitle)}</Td>
								{/* <Td>{req.videoUrl}</Td> */}
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
			</Container>
			{roomStore.room.hasSongs && (
				<Box>
					<HStack>
						<Button
							onClick={roomStore.room.popSong}
							colorScheme="blue"
							aria-label="next"
						>
							Next
						</Button>
						<IconButton
							aria-label="clear"
							icon={<CloseIcon />}
							onClick={roomStore.room.clearPlaylist}
							colorScheme="red"
						>
							Clear
						</IconButton>
					</HStack>
				</Box>
			)}
		</VStack>
	);
});

export default HostRoom;
