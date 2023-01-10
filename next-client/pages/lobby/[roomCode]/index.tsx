import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSocket } from "../../../contexts/sockets";
import { Badge, Container, Grid, Row, Table, Text } from "@nextui-org/react";
import styles from "../../../styles/gameRoom.module.css";
import SongRequest from "../../../models/request";

export default function GameRoom() {
	const { socket, activeRoom, joinRoom } = useSocket();
	const router = useRouter();
	const { roomCode } = router.query;
	const [roomSize, setRoomSize] = useState(1);

	const [playlist, setPlaylist] = useState<SongRequest[]>([]);

	useEffect(() => {
		(async function () {
			// TODO: Extract to constants

			await socket.on("request-added", (videoUrl: string) => {
				setPlaylist((playlist) =>
					playlist.concat([new SongRequest({ song: "Test", video: videoUrl })])
				);
				console.log(videoUrl);
			});

			await socket.on("members-changed", (count: string) => {
				setRoomSize(+count);
			});
		})();

		if (activeRoom === undefined && roomCode !== undefined) {
			joinRoom(roomCode as string);
		}
	}, [roomCode, joinRoom, activeRoom, socket]);

	return (
		<Grid.Container justify="center">
			<Grid xs={12}>
				<Container>
					<Row justify="center">
						<Badge variant="bordered" enableShadow color="secondary">
							{roomSize}
						</Badge>
						{socket.id}
					</Row>
					<Row justify="center">
						<h2 className={styles.roomCode}>Room Code:</h2>
					</Row>
					<Row justify="center">
						<Text
							blockquote
							h1
							size={60}
							css={{
								color: "$primary",
							}}
						>
							{roomCode}
						</Text>
					</Row>
				</Container>
			</Grid>
			<Container xl justify="center" fluid>
				{playlist.length > 0 ? (
					<Table css={{ minWidth: "100%" }}>
						<Table.Header>
							<Table.Column>Song</Table.Column>
							<Table.Column>Singer</Table.Column>
						</Table.Header>
						<Table.Body>
							{playlist.map((req: SongRequest) => (
								<Table.Row key={crypto.randomUUID()}>
									<Table.Cell>{req.songTitle}</Table.Cell>
									<Table.Cell>{req.singer}</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				) : (
					<Text blockquote className={styles.empty}>
						Nothing here yet! SongRequest a song!
					</Text>
				)}
			</Container>
		</Grid.Container>
	);
}
