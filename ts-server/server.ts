import express from "express";
import http from "http";
import Room from "./room";
import sockets from "socket.io";
import IVideoRequest from "./IVideoRequest";
import IJoinRequest from "./Requests/IJoinRequest";
import INameChangeRequest from "./Requests/INameChangeRequest";
import ISongRequest from "./Requests/ISongRequest";

const port = 5000;

const app = express();

const server = new http.Server(app);

const io = new sockets.Server(server, { cors: { origin: "*" } });

const lobbies: { [roomCode: string]: Room } = {};

const GetRoom = (roomCode: string): Room => lobbies[roomCode];

// const GetRoomId = (socket: sockets.Socket): string => {
// 	if (socket.rooms.size > 1) {
// 		socket.rooms.forEach((element: string) => {
// 			console.log(element);
// 		});
// 	}
// 	const [room] = socket.rooms;
// 	return room;
// };

// This is what the socket.io syntax is like, we will work this later
io.on("connection", (socket: sockets.Socket) => {
	console.log("User connected " + socket.id);

	socket.on("join-room", async (req: string) => {
		const { roomCode, name }: IJoinRequest = JSON.parse(req);

		console.log("new member joining room " + roomCode + ": " + socket.id);
		await socket.join(roomCode);

		let socketMemberState = "";
		if (lobbies[roomCode] !== undefined) {
			GetRoom(roomCode).addMember(socket.id, name);
			socketMemberState = "GUEST";
		} else {
			lobbies[roomCode] = new Room(socket.id);
			socketMemberState = "HOST";
		}

		socket.to(socket.id).emit("on-join-room", socketMemberState);
	});

	socket.on("try-host", async (roomCode: string) => {
		console.log("Try host");
		const room = GetRoom(roomCode);
		if (room === undefined) {
			console.log("Room doesn't exist");
			return;
		}
		console.log(room.host);
		if (room.host === "") {
			room.setHost(socket.id);
		}
		console.log(`New host: ${socket.id}`);
		socket.to(socket.id).emit("on-host-check", room.host);
	});

	socket.on("request-song", async (req: string) => {
		const { roomCode }: ISongRequest = JSON.parse(req);

		const room = GetRoom(roomCode);
		io.to(room.host).emit("on-request-song", req);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected: " + socket.id);
		Object.keys(lobbies).forEach((x) => {
			lobbies[x].disconnect(socket.id);
		});
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));
