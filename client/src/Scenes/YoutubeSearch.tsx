import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Image,
	Stack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import IVideo from "../Service/IVideo";
import YoutubeService from "../Service/YoutubeService";
import YoutubeSearchInput from "./YoutubeSearchInput";

interface IYoutubeSearchProps {
	onRequest: (video: IVideo) => void;
}

function YoutubeSearch(props: IYoutubeSearchProps) {
	const [searchResults, setSearchResults] = useState<IVideo[]>([]);
	const [canRequest, setCanRequest] = useState(true);

	const sendRequest = (video: IVideo) => {
		if (canRequest) {
			setCanRequest(false);
			props.onRequest(video);
		}

		setTimeout(() => {
			setCanRequest(true);
		}, 50);
	};

	const handleVideoSearch = async (query: string) => {
		var results = await YoutubeService.search(query);
		setSearchResults(results);
	};

	return (
		<>
			<Box width="100%" pl={10} pr={10}>
				<YoutubeSearchInput onSearch={handleVideoSearch} />
			</Box>
			<Wrap gap="5">
				{searchResults.map((result: IVideo) => (
					<WrapItem key={result.videoId} w={{ base: "300px" }}>
						<Card key={result.videoId}>
							<CardBody>
								<Image src={result.thumbnail} w="100%" />
								<Stack>
									<Box>
										<Heading h="40px" size="xs" textOverflow="ellipsis">
											{parse(result.title)}
										</Heading>
									</Box>
								</Stack>
							</CardBody>
							<CardFooter>
								<Button minW="100%" onClick={() => sendRequest(result)}>
									Add
								</Button>
							</CardFooter>
						</Card>
					</WrapItem>
				))}
			</Wrap>
		</>
	);
}
export default observer(YoutubeSearch);
