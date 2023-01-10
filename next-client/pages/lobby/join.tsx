import {
	Button,
	Col,
	Container,
	FormElement,
	Grid,
	Input,
	Row,
	Spacer,
} from "@nextui-org/react";
import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/join.module.css";

export default function JoinLobby() {
	const [roomCode, setRoomCode] = useState("");
	const [username, setUsername] = useState("");
	const [buttonValid, setButtonValid] = useState(false);
	const router = useRouter();

	const updateButton = () => {
		if (roomCode.length === 4 && username.length > 0) {
			setButtonValid(true);
		} else {
			setButtonValid(false);
		}
	};

	const updateRoomCode = (e: React.ChangeEvent<FormElement>) => {
		setRoomCode(e.target.value);
		updateButton();
	};

	const updateUsername = (e: React.ChangeEvent<FormElement>) => {
		setUsername(e.target.value);
		updateButton();
	};

	const joinRoom = () => {
		router.push(`/lobby/${roomCode}/guest`);
	};

	return (
		<>
			<Head>
				<title>Join Room</title>
			</Head>
			<Container className={styles.loginForm}>
				<Row>
					<Col offset={3} span={6}>
						<Input
							className={styles.roomInput}
							maxLength={4}
							fullWidth
							size="xl"
							value={roomCode}
							onChange={updateRoomCode}
							label="Room Code"
							placeholder="ENTER 4-LETTER CODE"
						/>
						<Spacer y={1} />
						<Input
							className={styles.roomInput}
							fullWidth
							size="xl"
							value={username}
							onChange={updateUsername}
							label="Name"
							placeholder="ENTER YOUR NAME"
						/>
						<Spacer y={1} />
						<Container fluid>
							<Row justify="center">
								<Button
									disabled={!buttonValid}
									onClick={joinRoom}
									className={styles.playButton}
								>
									JOIN
								</Button>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}
