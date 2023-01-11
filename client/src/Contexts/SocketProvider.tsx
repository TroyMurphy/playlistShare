import { makeObservable, observable } from "mobx";
import { createContext, ReactElement, useContext } from "react";
import openSocket, { Socket } from "socket.io-client";

export class SocketStore {
	socket: Socket;

	activeRoom?: string;
	activeUsername?: string;

	constructor() {
		this.socket = openSocket("localhost:5000");
		makeObservable(this, { activeUsername: observable });
	}

	setActiveUser = (name: string) => {
		this.activeUsername = name;
		var request = { roomCode: this.activeRoom, name: this.activeUsername };
		this.socket.emit("username-change", JSON.stringify(request));
	};

	requestVideo = async (videoUrl: string, name: string) => {
		if (this.activeRoom === undefined) {
			throw new Error("Room not set");
		}
		this.socket.emit(
			"request-video",
			JSON.stringify({
				video: videoUrl,
				from: name,
				room: this.activeRoom,
			})
		);
	};

	joinRoom = async (roomCode: string) => {
		var request = { roomCode: this.activeRoom, name: this.activeUsername };

		this.socket.emit("join-room", JSON.stringify(request));
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
