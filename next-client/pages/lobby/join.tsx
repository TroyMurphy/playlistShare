import { Button, FormElement, Grid, Input } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [roomCode, setRoomCode] = useState("");

	const updateRoomCode = (e: React.ChangeEvent<FormElement>) => {
		setRoomCode(e.target.value);
	};

	return (
		<>
			<Head>
				<title>Game room</title>
			</Head>
			<Grid.Container>
				<Grid xs={12}>
					<Input value={roomCode} onChange={updateRoomCode} />
				</Grid>
				<Grid.Container justify="center">
					<Grid xs={12}>
						<Button>Join</Button>
						<Button>Create</Button>
					</Grid>
				</Grid.Container>
			</Grid.Container>
		</>
	);
}
