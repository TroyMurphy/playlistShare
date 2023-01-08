import { createContext, ReactElement, useContext } from "react";
import openSocket, { Socket } from "socket.io-client";

export class SocketStore {
	socket: Socket;

	activeRoom?: string;

	constructor() {
		this.socket = openSocket("localhost:5000");
	}

	requestVideo = async (videoUrl: string) => {
		if (this.activeRoom === undefined) {
			throw new Error("Room not set");
		}
		this.socket.emit(
			"request-video",
			JSON.stringify({
				video: videoUrl,
				room: this.activeRoom,
			})
		);
	};

	joinRoom = async (roomCode: string) => {
		this.activeRoom = roomCode;

		this.socket.emit("join-room", roomCode);
	};
}

interface ChildrenProps<T> {
	children: (value: T) => React.ReactElement<unknown>;
}

export const socketSingleton = new SocketStore();

export const SocketStoreContext = createContext(socketSingleton);

export const useSocket = (): SocketStore => useContext(SocketStoreContext);

export const SocketConsumer = ({
	children,
}: ChildrenProps<SocketStore>): ReactElement => (
	<>{() => children(socketSingleton)}</>
);

export const Provider = ({
	children,
}: React.PropsWithChildren<unknown>): React.ReactElement => {
	return (
		<SocketStoreContext.Provider value={{ ...socketSingleton }}>
			{children}
		</SocketStoreContext.Provider>
	);
};
