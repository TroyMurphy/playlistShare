"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    /**
     *
     */
    constructor(socketId) {
        this.members = {};
        this.videos = [];
        this.host = socketId;
    }
    memberCount() {
        return Object.keys(this.members).length;
    }
    addMember(socket, name) {
        this.members[socket] = name;
    }
    disconnect(socketId) {
        delete this.members[socketId];
        if (this.host === socketId) {
            this.host = "";
        }
    }
    updateMember(socket, name) {
        this.members[socket] = name;
        // TODO: Update song requests?
    }
    setHost(socket) {
        this.host = socket;
    }
    addVideo(videoUrl) {
        this.videos.push(videoUrl);
    }
}
exports.default = Room;
