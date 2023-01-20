import { makeAutoObservable, observable } from "mobx";
import SongRequest from "./songRequest";

export enum RoomState {
	NOT_JOINED,
	OK,
	NO_HOST,
	TOO_MANY_HOSTS,
}

export default class Room {
	playlist = observable.array<SongRequest>([]);
	state = RoomState.OK;

	constructor() {
		makeAutoObservable(this);
	}

	addVideo(videoUrl: string, songTitle: string, singer: string, id: string) {
		if (this.playlist.find((x) => x.id === id) === undefined) {
			this.playlist.push(new SongRequest({ songTitle, videoUrl, singer }));
		}
	}

	removeVideo(id: string) {
		this.playlist.replace(this.playlist.filter((x) => x.id !== id));
	}

	clearPlaylist() {
		if (this.playlist != null) {
			this.playlist.clear();
		}
	}
}
