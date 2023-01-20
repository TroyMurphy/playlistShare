import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { RoomState } from "../Models/Room";
import { useStores } from "../Stores/RootStore";
// import { useParams } from "react-router-dom";
// import { useSocket } from "../Contexts/SocketProvider";
import YoutubeSearch from "./YoutubeSearch";

function GuestRoom() {
	const { roomStore } = useStores();

	const onRequest = (video: string) => {
		// requestVideo(video, "");
		roomStore.requestVideo(video, video);
		console.log("new request");
	};

	return (
		<>
			<h2>Signed in as: {roomStore.username}</h2>
			<h1>Have fun! Request Songs</h1>
			<h1 color={roomStore.room.state === RoomState.OK ? "green" : "red"}>
				RoomState: {roomStore.room.state}
			</h1>
			<Flex>
				<YoutubeSearch onRequest={onRequest} />
			</Flex>
		</>
	);
}

export default observer(GuestRoom);
