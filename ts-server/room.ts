class Room {
	members: Set<string> = new Set<string>();

	videos: Array<string> = [];

	name: string = "little fun time room";

	AddVideo(videoUrl: string) {
		this.videos.push(videoUrl);
	}
}

export default Room;
