import express from "express";
import http from "http";
import sockets from "socket.io";

const port = 5000;

const app = express();

const server = new http.Server(app);

const io = new sockets.Server(server, { cors: { origin: "*" } });

const lobbies: { [roomCode: string]: Set<string> } = {};

// This is what the socket.io syntax is like, we will work this later
io.on("connection", (socket) => {
	console.log("User connected " + socket.id);

	// just like on the client side, we have a socket.on method that takes a callback function
	socket.on("change-color", (color) => {
		// once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
		// we make use of the socket.emit method again with the argument given to use from the callback function above
		console.log("Color Changed to: ", color);
		io.sockets.emit("change-color", color);
	});

	socket.on("join-room", async (roomCode) => {
		console.log("new member joining room " + roomCode);
		await socket.join(roomCode);
		if (lobbies[roomCode]) {
			lobbies[roomCode].add(socket.id);
		} else {
			lobbies[roomCode] = new Set([socket.id]);
		}
		// socket.in(roomCode).emit('members-change', Array.from(activeUsers));
		// io.emit('members-change', Array.from(activeUsers));
		await io.in(roomCode).emit("members-change", Array.from(lobbies[roomCode]));
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
		Object.keys(lobbies).forEach((x) => {
			lobbies[x].delete(socket.id);
			io.to(x).emit("members-change", Array.from(lobbies[x]));
		});
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));
