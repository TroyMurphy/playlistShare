import {
	Autocomplete,
	Box,
	Card,
	CardContent,
	CardMedia,
	Grid,
	TextField,
	TextFieldProps,
	Typography,
} from "@mui/material";
import { useState } from "react";

interface IYoutubeSearchProps {
	onRequest: (videoUrl: string) => void;
}

function YoutubeSearch(props: IYoutubeSearchProps) {
	const [searchResults, setSearchResults] = useState<string[]>([
		"apple",
		"Banana",
		"sillygoose",
	]);

	return (
		<>
			<Box>
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={searchResults}
					renderInput={(params: TextFieldProps) => (
						<TextField {...params} label="New Request" />
					)}
				/>
			</Box>
			<Grid container spacing={2}>
				<Grid>
					{searchResults.map((result: string, index: number) => (
						<Card
							sx={{ maxWidth: 200 }}
							key={index}
							onClick={() => props.onRequest(result)}
						>
							<CardMedia
								component="img"
								height="200"
								image="https://unsplash.it/200"
								alt="Paella dish"
							/>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{result}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Grid>
			</Grid>
		</>
	);
}
export default YoutubeSearch;
