"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const room_1 = __importDefault(require("./room"));
const config_1 = require("./config");
const environment = process.env.NODE_ENV || "development";
const envVars = config_1.config[environment];
const { PORT, CORS_ORIGIN } = envVars;
const port = PORT;
const app = (0, express_1.default)();
const server = new http_1.default.Server(app);
const io = new socket_io_1.default.Server(server, { cors: { origin: CORS_ORIGIN } });
const lobbies = {};
const GetRoom = (roomCode) => lobbies[roomCode];
// This is what the socket.io syntax is like, we will work this later
io.on("connection", (socket) => {
    console.log("User connected " + socket.id);
    socket.on("join-room", (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomCode, name } = JSON.parse(req);
        console.log("new member joining room " + roomCode + ": " + socket.id);
        yield socket.join(roomCode);
        let socketMemberState = "";
        if (lobbies[roomCode] !== undefined) {
            GetRoom(roomCode).addMember(socket.id, name);
            socketMemberState = "GUEST";
        }
        else {
            lobbies[roomCode] = new room_1.default(socket.id);
            socketMemberState = "HOST";
        }
        socket.to(socket.id).emit("on-join-room", socketMemberState);
    }));
    socket.on("try-host", (roomCode) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    socket.on("request-song", (req) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomCode } = JSON.parse(req);
        const room = GetRoom(roomCode);
        io.to(room.host).emit("on-request-song", req);
    }));
    socket.on("disconnect", () => {
        console.log("user disconnected: " + socket.id);
        Object.keys(lobbies).forEach((x) => {
            lobbies[x].disconnect(socket.id);
        });
    });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
