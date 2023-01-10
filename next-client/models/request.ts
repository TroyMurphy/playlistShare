export default class SongRequest {
	songTitle: string;
	videoUrl: string;
	singer: string;
	/**
	 *
	 */
	constructor(input: { song?: string; video: string; singer?: string }) {
		this.songTitle = input.song ?? "";
		this.videoUrl = input.video ?? "";
		this.singer = input.singer ?? "";
	}
}
