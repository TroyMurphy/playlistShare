import { useEffect, useState } from "react";
import { useSocket } from "../Contexts/SocketProvider";

interface IColorsProps {}

function Colors(props: IColorsProps) {
	const [color, setColor] = useState("white");
	const { socket } = useSocket();

	const changeColor = (newColor: string) => {
		socket?.emit("change-color", newColor);
	};

	useEffect(() => {
		if (socket === undefined) {
			console.log("ERROR: NO socket");
			return;
		}
		socket.on("change-color", (col: string) => {
			setColor(col);
		});
	}, [socket]);

	return (
		<div style={{ textAlign: "center" }}>
			<div
				id="square"
				style={{ backgroundColor: color, height: 200, width: 200 }}
			></div>
			<button id="blue" onClick={() => changeColor("blue")}>
				Blue
			</button>
			<button id="red" onClick={() => changeColor("red")}>
				Red
			</button>
		</div>
	);
}

export default Colors;
