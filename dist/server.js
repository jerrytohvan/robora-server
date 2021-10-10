"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3000;
const INDEX = "index.html";
/*
 * Web server
 */
const app = express_1.default()
    .use(express_1.default.static("src"))
    .use("/", (req, res) => res.sendFile(INDEX, { root: __dirname }));
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
/*
 * Socket server
 */
const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origins: "*",
        methods: ["GET"],
        credentials: true,
    },
});
io.on("connection", (client) => {
    console.log(`Client is connected!`);
    console.log(client.id);
    // client.join("test");
    client.on("_ping", (data) => {
        console.log(`Ping client`);
        client.emit("OK");
    });
});
