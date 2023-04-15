import { Flex, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { ChangeEvent, useEffect, useState } from "react";
import YoutubeService from "../Service/YoutubeService";

function useDebounceValue(value: string, time = 250) {
	const [debounceValue, setDebounceValue] = useState(value);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounceValue(value);
		}, time);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, time]);

	return debounceValue;
}

function YoutubeAutocomplete() {
	const [suggestions, setSuggestions] = useState<string[] | null>([]);
	const [query, setQuery] = useState<string>("");
	const debounceQuery = useDebounceValue(query);

	useEffect(() => {
		if (process.env.USE_AUTOCOMPLETE) {
			(async () => {
				setSuggestions([]);
				if (debounceQuery.length > 0) {
					const data = await YoutubeService.autocomplete(debounceQuery);
					setSuggestions(data);
				}
			})();
		}
	}, [debounceQuery]);

	const handleAutocompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<Flex pt="48" justify="center" align="center" w="full">
			<FormControl w="60">
				<FormLabel>Find a video</FormLabel>
				<AutoComplete openOnFocus>
					<AutoCompleteInput
						variant="filled"
						onChange={handleAutocompleteChange}
					/>
					{suggestions != null && (
						<AutoCompleteList>
							{suggestions.map((result, idx) => (
								<AutoCompleteItem
									key={`option-${idx}`}
									value={result}
									textTransform="capitalize"
								>
									{result}
								</AutoCompleteItem>
							))}
						</AutoCompleteList>
					)}
				</AutoComplete>
				<FormHelperText>Search for something...</FormHelperText>
			</FormControl>
		</Flex>
	);
}

export default YoutubeAutocomplete;
