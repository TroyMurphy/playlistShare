import { makeAutoObservable } from "mobx";
import openSocket, { Socket } from "socket.io-client";
import { RoomState } from "../Models/Room";
import IJoinRequest from "../Service/IJoinRequest";
import ISongRequest from "../Service/ISongRequest";
import { RootStore } from "./RootStore";

export class SocketStore {
	rootStore: RootStore;
	socket: Socket;

	private static SERVER_URL =
		process.env.REACT_APP_SERVER_BASE_URL || "localhost:5000";

	constructor(rootStore: RootStore) {
		this.socket = openSocket(SocketStore.SERVER_URL);
		this.rootStore = rootStore;
		makeAutoObservable(this);
		this.initializeSocket();
	}

	initializeSocket() {
		this.socket.on("on-request-song", (req: string) => {
			const { songTitle, videoUrl, singer, id }: ISongRequest = JSON.parse(req);
			this.rootStore.roomStore.room.addVideo(videoUrl, songTitle, singer, id);
		});

		this.socket.on("on-host-check", (hostId: string) => {
			if (this.socket.id !== hostId) {
				this.rootStore.roomStore.room.state = RoomState.TOO_MANY_HOSTS;
			}
		});

		this.socket.on("on-join-room", (status: string) => {
			console.log("Joined as: " + status);
		});
	}

	tryHost = async () => {
		this.socket.emit("try-host", this.rootStore.roomStore.roomCode);
	};

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
