import { useEffect } from "react";
import { useSocket } from "../../contexts/sockets";

interface IRoom {
	roomCode: string;
}

export default function Post({ roomCode }: IRoom) {
	const { joinRoom } = useSocket();

	useEffect(() => {
		joinRoom(roomCode);
	});

	return (
		<>
			<h1>Welcome to your shared playlist</h1>
			<p>{roomCode}</p>
		</>
	);
}
