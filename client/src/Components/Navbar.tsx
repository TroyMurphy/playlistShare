import { AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Stack,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Contexts/SocketProvider";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { generateId } from "../utilities/idGenerator";

function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { activeRoom } = useSocket();
	const navigate = useNavigate();

	const createRoom = () => {
		// onRoomCode(generateRoomCode());
		var room = generateId(4);
		navigate(`/room/${room}/host`);
	};

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<Box>Logo</Box>

				<Flex alignItems={"center"}>
					<Stack direction={"row"} spacing={7}>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? (
								<MoonIcon fill="currentColor" filled />
							) : (
								<SunIcon fill="currentColor" filled />
							)}
						</Button>

						{activeRoom === undefined && (
							<Button leftIcon={<AddIcon />} onClick={createRoom}>
								Create new Room
							</Button>
						)}
					</Stack>
				</Flex>
			</Flex>
		</Box>
	);
}

export default Navbar;
