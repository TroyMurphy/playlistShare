import {
	Button,
	Navbar,
	Switch,
	SwitchEvent,
	Text,
	useTheme,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useSocket } from "../contexts/sockets";
import styles from "../styles/layout.module.css";
import { generateId } from "../utilities/idGenerator";
import { useTheme as useNextTheme } from "next-themes";
import React from "react";
import { SunIcon } from "../assets/icons/SunIcon";
import { MoonIcon } from "../assets/icons/MoonIcon";

interface ILayoutProps {
	children: React.ReactElement;
}

export default function Layout({ children }: ILayoutProps) {
	const { activeRoom } = useSocket();
	const { setTheme } = useNextTheme();
	const { isDark, type } = useTheme();
	const router = useRouter();

	const newRoom = () => {
		const randomCode = generateId(4);
		router.push(`/lobby/${randomCode}`);
	};

	return (
		<>
			<Navbar isBordered variant="floating">
				<Navbar.Content>
					<Text b color="inherit" hideIn="xs">
						Share-e-oke
					</Text>
				</Navbar.Content>
				<Navbar.Content>
					{activeRoom === undefined && (
						<Navbar.Item>
							<Button onClick={newRoom}>Create New Room</Button>
						</Navbar.Item>
					)}
					<Navbar.Item>
						<Button
							auto
							light
							color="secondary"
							icon={
								isDark ? (
									<SunIcon fill="currentColor" filled />
								) : (
									<MoonIcon fill="currentColor" filled />
								)
							}
							onClick={() => setTheme(isDark ? "light" : "dark")}
						>
							{isDark ? "Go Light" : "Go Dark"}
						</Button>
					</Navbar.Item>
				</Navbar.Content>
			</Navbar>
			<main className={styles.main}>{children}</main>
		</>
	);
}
