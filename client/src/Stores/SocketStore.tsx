import openSocket, { Socket } from "socket.io-client";
import IJoinRequest from "../Service/IJoinRequest";
import ISongRequest from "../Service/ISongRequest";
import { RootStore } from "./RootStore";

export class SocketStore {
	rootStore: RootStore;
	socket: Socket;

	constructor(rootStore: RootStore) {
		this.socket = openSocket("localhost:5000");
		this.rootStore = rootStore;
	}

	joinRoom = async (roomCode: string, username: string) => {
		const request: IJoinRequest = { roomCode: roomCode, name: username };
		this.socket.emit("join-room", JSON.stringify(request));
	};

	requestVideo = async (
		videoUrl: string,
		songTitle: string,
		requestId: string
	) => {
		const request: ISongRequest = {
			id: requestId,
			videoUrl,
			songTitle,
			roomCode: this.rootStore.roomStore.roomCode,
			singer: this.rootStore.roomStore.username,
		};
		this.socket.emit("request-song", JSON.stringify(request));
	};
}
