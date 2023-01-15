import { makeAutoObservable } from "mobx";
import { STORAGE_ROOM_CODE_KEY, STORAGE_USERNAME_KEY } from "../Constants";
import Room from "../Models/Room";
import { RootStore } from "./RootStore";

class RoomStore {
	rootStore: RootStore;

	roomCode: string = "";
	username: string = "";

	room: Room = new Room();

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		var storedCode = sessionStorage.getItem(STORAGE_ROOM_CODE_KEY);
		var storedUsername = sessionStorage.getItem(STORAGE_USERNAME_KEY);
		if (storedCode != null) {
			this.roomCode = storedCode;
		}
		if (storedUsername != null) {
			this.username = storedUsername;
		}

		makeAutoObservable(this);
	}

	joinRoom = (code: string, username: string) => {
		this.setRoomCode(code);
		this.setUsername(username);
		this.rootStore.socketStore.joinRoom(code, username);
	};

	requestVideo = (url: string, videoName: string) => {
		const requestId = crypto.randomUUID();
		this.rootStore.socketStore.requestVideo(url, videoName, requestId);
	};

	setRoomCode = (code: string) => {
		this.roomCode = code;
		sessionStorage.setItem(STORAGE_ROOM_CODE_KEY, this.roomCode);
	};

	setUsername = (name: string) => {
		this.username = name;
		sessionStorage.setItem(STORAGE_USERNAME_KEY, this.roomCode);
	};

	clearRoomCode = () => {
		this.roomCode = "";
		sessionStorage.removeItem(STORAGE_ROOM_CODE_KEY);
	};

	get hasRoomCode() {
		return this.roomCode !== "";
	}
}

export default RoomStore;
