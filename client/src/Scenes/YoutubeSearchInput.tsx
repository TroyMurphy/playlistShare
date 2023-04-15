import { SearchIcon } from "@chakra-ui/icons";
import {
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

interface IYoutubeSearchInput {
	onSearch: (search: string) => void;
}

function YoutubeSearchInput(props: IYoutubeSearchInput) {
	const [value, setValue] = useState("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const doSearch = () => {
		props.onSearch(value);
	};

	return (
		<>
			<InputGroup size="lg">
				<Input
					value={value}
					onChange={handleChange}
					placeholder="Search video..."
					size="lg"
					onKeyPress={(e: KeyboardEvent) => {
						if (e.key === "Enter") {
							doSearch();
						}
					}}
				/>
				<InputRightElement width="4.5rem">
					<IconButton
						size="lg"
						onClick={doSearch}
						aria-label="search"
						icon={<SearchIcon />}
					>
						Search
					</IconButton>
				</InputRightElement>
			</InputGroup>
		</>
	);
}
export default YoutubeSearchInput;
