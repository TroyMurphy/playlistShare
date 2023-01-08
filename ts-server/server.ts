import express from "express";
import http from "http";
import Room from "./room";
import sockets from "socket.io";
import IVideoRequest from "./IVideoRequest";

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

	// just like on the client side, we have a socket.on method that takes a callback function
	socket.on("change-color", (color: string) => {
		// once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
		// we make use of the socket.emit method again with the argument given to use from the callback function above
		console.log("Color Changed to: ", color);
		io.sockets.emit("change-color", color);
	});

	socket.on("request-video", async (req: string) => {
		const request: IVideoRequest = JSON.parse(req);
		console.dir(request);
		console.log(Object.keys(lobbies).join(","));
		// TODO: push video to array
		GetRoom(request.room).AddVideo(request.video);

		await io.in(request.room).emit("request-added", request.video);
	});

	socket.on("join-room", async (roomCode: string) => {
		console.log("new member joining room " + roomCode);
		await socket.join(roomCode);
		if (lobbies[roomCode] !== undefined) {
			console.log("if");
			GetRoom(roomCode).members.add(socket.id);
		} else {
			console.log("else");
			lobbies[roomCode] = new Room();
			lobbies[roomCode].members = new Set([socket.id]);
		}
		await io
			.in(roomCode)
			.emit("members-change", Array.from(GetRoom(roomCode).members));

		await io
			.to(socket.id)
			.emit("playlist-init", Array.from(GetRoom(roomCode).videos));
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
		Object.keys(lobbies).forEach((x) => {
			lobbies[x].members.delete(socket.id);
			io.to(x).emit("members-change", Array.from(lobbies[x].members));
		});
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));
