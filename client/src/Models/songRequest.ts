export default class SongRequest {
	songTitle: string;
	videoUrl: string;
	singer: string;
	id: string;
	/**
	 *
	 */
	constructor(input: {
		songTitle?: string;
		videoUrl: string;
		singer?: string;
	}) {
		this.id = crypto.randomUUID();
		this.songTitle = input.songTitle ?? "";
		this.videoUrl = input.videoUrl ?? "";
		this.singer = input.singer ?? "";
	}
}
