import { useState } from "react";

interface ILandingProps {
	onRoomCode: (x: string) => void;
}

function Landing(props: ILandingProps) {
	const { onRoomCode } = props;

	const [roomCode, setRoomCode] = useState<string>("");

	const generateRoomCode = (): string => {
		// not scalable
		return new Date().valueOf().toString(32).toUpperCase();
	};

	const joinRoom = () => {
		if (roomCode !== "") {
			onRoomCode(roomCode);
		}
	};

	const createRoom = () => {
		onRoomCode(generateRoomCode());
	};

	return (
		<div>
			<h1>Landing</h1>
			<div>
				<form onSubmit={joinRoom}>
					<input
						type="text"
						value={roomCode}
						onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
					/>
					<button
						type="submit"
						disabled={roomCode === undefined || roomCode === ""}
					>
						Join Room
					</button>
				</form>
			</div>
			<hr />
			<button onClick={createRoom}>Create A New Room</button>
		</div>
	);
}

export default Landing;
