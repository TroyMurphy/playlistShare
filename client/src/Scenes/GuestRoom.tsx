import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
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

	useEffect(() => {
		(async function () {})();
	}, []);

	return (
		<>
			<h2>Signed in as: {roomStore.username}</h2>
			<h1>Have fun! Request Songs</h1>
			<Flex>
				<YoutubeSearch onRequest={onRequest} />
			</Flex>
		</>
	);
}

export default observer(GuestRoom);
