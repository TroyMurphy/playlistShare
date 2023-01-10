import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSocket } from "../../../contexts/sockets";
import { Button, Container, Grid, Table } from "@nextui-org/react";
import styles from "../../../styles/gameRoom.module.css";

export default function GameRoom() {
	const { socket, activeRoom, requestVideo, joinRoom } = useSocket();
	const router = useRouter();
	const { roomCode } = router.query;

	useEffect(() => {
		(async function () {
			// TODO: Extract to constants
		})();

		if (activeRoom === undefined && roomCode !== undefined) {
			joinRoom(roomCode as string);
		}
	}, [roomCode, joinRoom, activeRoom, socket]);

	const onRequest = (video: string) => {
		requestVideo(video);
	};

	return (
		<Grid.Container justify="center">
			<Grid xs={12}>
				<Container>
					<h2 className={styles.h2}>{roomCode}</h2>
				</Container>
			</Grid>
			<Grid xs={12} justify="center">
				<Container>Waiting for host... Request a song?</Container>
				<Button onClick={() => onRequest("apple")}>Apple</Button>
				<Button onClick={() => onRequest("duck")}>Duck</Button>
				<Button onClick={() => onRequest("sillygoose")}>Goose</Button>
			</Grid>
		</Grid.Container>
	);
}
