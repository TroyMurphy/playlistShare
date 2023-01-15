import { makeAutoObservable } from "mobx";
import SongRequest from "./songRequest";

export default class Room {
	playlist: Array<SongRequest> = new Array<SongRequest>();

	constructor() {
		makeAutoObservable(this);
	}

	addVideo(videoUrl: string, songTitle: string, singer: string, id: string) {
		if (this.playlist.find((x) => x.id === id) === undefined) {
			this.playlist.push(new SongRequest({ songTitle, videoUrl, singer }));
		}
	}

	clearPlaylist() {
		this.playlist = [];
	}
}
