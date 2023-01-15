import { Box, Button, Flex, Input, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../Stores/RootStore";
import "./Landing.css";

function Landing() {
	const { roomStore } = useStores();
	const navigate = useNavigate();
	const [roomCode, setRoomCode] = useState<string>("");
	const [name, setName] = useState<string>("");

	useEffect(() => {
		roomStore.setRoomCode("");
	}, [roomStore]);

	const joinRoom = () => {
		if (roomCode !== "") {
			roomStore.joinRoom(roomCode, name);
			navigate(`/room/guest`);
		}
	};

	return (
		<Flex justify="center" marginTop="10">
			<VStack className="login-container">
				<Box w="100%">
					<label htmlFor="room">ROOM</label>
				</Box>
				<Input
					maxLength={4}
					placeholder="ENTER 4-LETTER CODE"
					id="room"
					value={roomCode}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setRoomCode(e.target.value.toUpperCase())
					}
				/>
				<Spacer />
				<Box w="100%">
					<label htmlFor="room">NAME</label>
				</Box>
				<Input
					type="text"
					value={name}
					placeholder="ENTER NAME"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value.toUpperCase())
					}
				/>
				<Spacer />
				<Button
					width="80%"
					p="5"
					disabled={roomCode.length !== 4 || name.length === 0}
					onClick={joinRoom}
				>
					JOIN
				</Button>
			</VStack>
		</Flex>
	);
}

export default Landing;
