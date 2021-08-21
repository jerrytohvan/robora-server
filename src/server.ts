import express from "express";
const PORT = process.env.PORT || 8080;
const INDEX = "/index.html";

/*
 * Web server
 */

const app = express()
  .use(express.static("src"))
  .use("/", (req, res) => res.sendFile(INDEX, { root: __dirname }));

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

/*
 * Socket server
 */

const io = require("socket.io")(server, {
  cors: {
    origins: "*",
    methods: ["GET"],
    credentials: true,
  },
});

io.on("connection", (client) => {
  console.log(`Client is connected ${JSON.stringify(client)}`);
});
