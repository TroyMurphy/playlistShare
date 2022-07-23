import { createContext, ReactElement, useContext } from "react";
import openSocket, { Socket } from "socket.io-client";

export class SocketStore {
	socket: Socket;

	activeRoom?: string;

	constructor() {
		this.socket = openSocket("localhost:5000");
	}

	joinRoom = async (roomCode: string) => {
		if (this.activeRoom === undefined) {
			this.activeRoom = roomCode;

			this.socket.emit("join-room", roomCode);
		}
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

// import {
// 	createContext,
// 	PropsWithChildren,
// 	useCallback,
// 	useContext,
// 	useEffect,
// 	useState,
// } from "react";
// import io, { Socket } from "socket.io-client";

// const SocketContext = createContext({} as Socket);

// export function useSocket() {
// 	return useContext(SocketContext);
// }

// interface ISocketProviderProps {}

// function SocketProvider(props: PropsWithChildren<ISocketProviderProps>) {
// 	const { children } = props;
// 	const [socket, setSocket] = useState<Socket>();

// 	const connectToSocket = useCallback(() => {
// 		console.log("Connecting to socket.io");
// 		if (socket === undefined) {
// 			console.log("no active socket");
// 			const conn = io("localhost:5000");
// 			setSocket(conn);
// 		}

// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	useEffect(() => {
// 		connectToSocket();
// 	}, [connectToSocket, socket]);

// 	if (!socket) {
// 		return <>Loading...</>;
// 	}

// 	return (
// 		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
// 	);
// }

// export default SocketProvider;
