import { makeAutoObservable } from "mobx";
import { STORAGE_ROOM_CODE_KEY, STORAGE_USERNAME_KEY } from "../Constants";
import Room from "../Models/Room";
import { RootStore } from "./RootStore";

export enum UserType {
	NONE,
	GUEST,
	HOST,
}

class RoomStore {
	rootStore: RootStore;

	roomCode: string = "";
	username: string = "";

	userType = UserType.NONE;

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
		if (this.roomCode && this.username) {
			this.joinRoom(this.roomCode, this.username);
		}

		makeAutoObservable(this);
	}

	joinRoom = (
		code: string,
		username: string,
		userType: UserType = UserType.GUEST
	) => {
		this.userType = userType;
		this.setRoomCode(code);
		this.setUsername(username);
		this.rootStore.socketStore.joinRoom(code, username);
	};

	requestVideo = (url: string, videoName: string) => {
		const requestId = crypto.randomUUID();
		this.rootStore.socketStore.requestVideo(url, videoName, requestId);
	};

	setUserType = (userType: UserType) => {
		this.userType = userType;
	};

	setRoomCode = (code: string) => {
		this.roomCode = code;
		sessionStorage.setItem(STORAGE_ROOM_CODE_KEY, this.roomCode);
	};

	setUsername = (name: string) => {
		this.username = name;
		sessionStorage.setItem(STORAGE_USERNAME_KEY, this.username);
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
