import { Box, Heading, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import IVideo from "../Service/IVideo";
import { useStores } from "../Stores/RootStore";
import YoutubeSearch from "./YoutubeSearch";

function GuestRoom() {
	const { roomStore } = useStores();

	const onRequest = (video: IVideo) => {
		roomStore.requestVideo(video);
		console.log("new request");
	};

	return (
		<VStack justify="center">
			<Box textAlign="center" pt={5}>
				<Heading as="h2" size="xl" colorScheme="blue">
					{roomStore.username}
				</Heading>
			</Box>
			<Box width="100%" justifyContent="center">
				<YoutubeSearch onRequest={onRequest} />
			</Box>
		</VStack>
	);
}

export default observer(GuestRoom);
