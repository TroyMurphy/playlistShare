import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../Contexts/SocketProvider";
import YoutubeSearch from "./YoutubeSearch";

function GuestRoom() {
	const { socket, activeUsername, joinRoom, requestVideo } = useSocket();
	const { roomCode } = useParams();

	const onRequest = (video: string) => {
		requestVideo(video, "");
	};

	useEffect(() => {
		(async function () {
			joinRoom(roomCode as string);
		})();
	}, [joinRoom, roomCode]);

	return (
		<>
			<h3>{socket.id}</h3>
			<h2>Signed in as: {activeUsername}</h2>
			<h1>Have fun! Request Songs</h1>
			<Flex>
				<YoutubeSearch onRequest={onRequest} />
			</Flex>
		</>
	);
}

export default observer(GuestRoom);
