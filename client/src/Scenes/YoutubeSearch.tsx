import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Grid,
	GridItem,
	Image,
	Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

interface IYoutubeSearchProps {
	onRequest: (videoUrl: string) => void;
}

function YoutubeSearch(props: IYoutubeSearchProps) {
	const [searchResults] = useState<string[]>(["apple", "Banana", "sillygoose"]);
	const [canRequest, setCanRequest] = useState(true);

	const sendRequest = (video: string) => {
		if (canRequest) {
			setCanRequest(false);
			props.onRequest(video);
		}

		setTimeout(() => {
			setCanRequest(true);
		}, 50);
	};

	return (
		<>
			<Grid gap={2}>
				<GridItem>
					{searchResults.map((result: string, index: number) => (
						<Card key={index}>
							<CardBody>
								<Image src="https://unsplash.it/200" />
							</CardBody>
							<CardFooter>
								<Text>{result}</Text>
								<Button onClick={() => sendRequest(result)}>Add</Button>
							</CardFooter>
						</Card>
					))}
				</GridItem>
			</Grid>
		</>
	);
}
export default observer(YoutubeSearch);
