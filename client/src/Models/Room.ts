export default class Room {
	playlist: Array<string>;

	constructor() {
		this.playlist = new Array<string>();
	}

	setPlaylist(videos: string[]) {
		this.playlist = videos;
	}

	addVideo(videoUrl: string) {
		this.playlist.push(videoUrl);
	}
}
