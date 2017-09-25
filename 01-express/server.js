"use strict";

var http = require("http");
var express = require("express");
var socketIo = require("socket.io");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // this is unnecessary when you use the direct views subfolder.

app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
    response.end("Hello World!");
});

app.get("/home", (request, response) => {
    response.render("index", {title: "Home"});
});

const server = http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("Socket connected");
    socket.on("chat:add", data => {
        console.log(data);
        io.emit("chat:added", data);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});