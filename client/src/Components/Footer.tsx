import "./Footer.css";
import {
	Box,
	useColorModeValue,
	Container,
	Stack,
	Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useStores } from "../Stores/RootStore";

const Footer = observer(() => {
	const { socketStore } = useStores();

	return (
		<Box
			className="footer-wrapper"
			bg={useColorModeValue("gray.50", "gray.900")}
			color={useColorModeValue("gray.700", "gray.200")}
		>
			<Container
				as={Stack}
				py={4}
				direction={{ base: "column", md: "row" }}
				spacing={4}
				justify={{ base: "center", md: "space-between" }}
				align={{ base: "center", md: "center" }}
			>
				<Text>{socketStore.socket.id}</Text>
			</Container>
		</Box>
	);
});

export default Footer;
