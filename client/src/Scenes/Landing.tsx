import "./Landing.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Spacer, VStack } from "@chakra-ui/react";

interface ILandingProps {
	// onRoomCode: (x: string) => void;
}

function Landing(props: ILandingProps) {
	// const { onRoomCode } = props;

	const navigate = useNavigate();
	const [roomCode, setRoomCode] = useState<string>("");
	const [name, setName] = useState<string>("");

	const joinRoom = () => {
		if (roomCode !== "") {
			navigate(`/room/${roomCode}/guest`);
		}
	};

	return (
		<Flex justify="center">
			<VStack className="login-container">
				<Box w="100%">
					<label htmlFor="room">ROOM</label>
				</Box>
				<Input
					maxLength={4}
					placeholder="ENTER 4-LETTER CODE"
					id="room"
					value={roomCode}
					onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
				/>
				<Spacer />
				<Box w="100%">
					<label htmlFor="room">NAME</label>
				</Box>
				<Input
					type="text"
					value={name}
					placeholder="ENTER NAME"
					onChange={(e) => setName(e.target.value.toUpperCase())}
				/>
				<Spacer />
				<Button
					width="80%"
					disabled={roomCode === undefined || roomCode === ""}
					onClick={joinRoom}
				>
					JOIN
				</Button>
			</VStack>
		</Flex>
	);
}

export default Landing;
