// import { AddIcon } from "@chakra-ui/icons";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Stack,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
import { UserType } from "../Stores/RoomStore";
import { useStores } from "../Stores/RootStore";
import { generateId } from "../utilities/idGenerator";

const Navbar = observer(() => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { roomStore } = useStores();
	const navigate = useNavigate();

	const createRoom = () => {
		var newRoomCode = generateId(4);
		roomStore.joinRoom(newRoomCode, "", UserType.HOST);
		navigate(`/room/host`);
	};

	const handleLeaveRoom = () => {
		roomStore.clearRoomCode();
		navigate(`/landing`);
	};

	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<Box>Playlist Share</Box>
				<Box>{roomStore.roomCode}</Box>

				<Flex alignItems={"center"}>
					<Stack direction={"row"} spacing={7}>
						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? (
								<MoonIcon fill="currentColor" filled />
							) : (
								<SunIcon fill="currentColor" filled />
							)}
						</Button>

						{roomStore.hasRoomCode ? (
							<Button
								colorScheme="red"
								leftIcon={<CloseIcon />}
								onClick={handleLeaveRoom}
							>
								Leave Room
							</Button>
						) : (
							<Button onClick={createRoom} leftIcon={<AddIcon />}>
								New Room
							</Button>
						)}
					</Stack>
				</Flex>
			</Flex>
		</Box>
	);
});

export default Navbar;
