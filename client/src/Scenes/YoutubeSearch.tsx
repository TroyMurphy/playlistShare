import {
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

	return (
		<>
			<Grid gap={2}>
				<GridItem>
					{searchResults.map((result: string, index: number) => (
						<Card key={index} onClick={() => props.onRequest(result)}>
							<CardBody>
								<Image src="https://unsplash.it/200" />
							</CardBody>
							<CardFooter>
								<Text>{result}</Text>
							</CardFooter>
						</Card>
					))}
				</GridItem>
			</Grid>
		</>
	);
}
export default observer(YoutubeSearch);
