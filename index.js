const express = require("express");
const db = require("./data/db")
const postsRouter = require("./data/router")

const server = express();
const port = 4000;

server.use(express.json());
server.use("/api/posts", postsRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});