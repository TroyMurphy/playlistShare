class Room {
	members: { [id: string]: string } = {};

	host: string;

	videos: Array<string> = [];

	/**
	 *
	 */
	constructor(socketId: string) {
		this.host = socketId;
	}

	memberCount(): number {
		return Object.keys(this.members).length;
	}

	addMember(socket: string, name: string) {
		this.members[socket] = name;
	}

	disconnect(socketId: string) {
		delete this.members[socketId];
		if (this.host === socketId) {
			this.host = "";
		}
	}

	updateMember(socket: string, name: string) {
		this.members[socket] = name;
		// TODO: Update song requests?
	}

	setHost(socket: string) {
		this.host = socket;
	}

	addVideo(videoUrl: string) {
		this.videos.push(videoUrl);
	}
}

export default Room;
