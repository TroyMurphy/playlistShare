class Room {
	members: Set<string> = new Set<string>();

	host: string;

	videos: Array<string> = [];

	name: string = "little fun time room";

	/**
	 *
	 */
	constructor(socketId: string) {
		this.host = socketId;
	}

	AddVideo(videoUrl: string) {
		this.videos.push(videoUrl);
	}
}

export default Room;
