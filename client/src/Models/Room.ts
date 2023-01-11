import { makeAutoObservable } from "mobx";
import SongRequest from "./songRequest";

export default class Room {
	playlist: Array<SongRequest> = new Array<SongRequest>();

	activeUser: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	setPlaylist(videos: string[]) {
		this.playlist = videos.map((x) => new SongRequest({ video: x }));
	}

	setActiveUser(name: string) {
		this.activeUser = name;
	}

	addVideo(videoUrl: string) {
		this.playlist.push(new SongRequest({ video: videoUrl }));
	}
}
