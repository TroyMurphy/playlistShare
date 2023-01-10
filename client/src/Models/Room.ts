import { makeAutoObservable } from "mobx";
import SongRequest from "./songRequest";

export default class Room {
	playlist: Array<SongRequest> = new Array<SongRequest>();

	constructor() {
		makeAutoObservable(this);
	}

	setPlaylist(videos: string[]) {
		this.playlist = videos.map((x) => new SongRequest({ video: x }));
	}

	addVideo(videoUrl: string) {
		this.playlist.push(new SongRequest({ video: videoUrl }));
	}
}
