"use strict";

var http = require("http");
var express = require("express");
var socketIo = require("socket.io");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); // this is unnecessary when you use the direct views subfolder.

app.use(express.static(__dirname + "/public"));

app.use((request, response, next) => {
    console.log("In middleware 1");
    // response.write("HEADER\n");
    next();
    console.log("Out of middleware 1");
});


app.use((request, response, next) => {
    console.log("In middleware 2");
    // response.write("Header 2\n");
    next();
    console.log("Out of middleware 2");
});

app.get("/", (request, response) => {
    console.log("In handler");
    response.end("Hello World!");
});

app.get("/home", (request, response) => {
    response.render("index", {title: "Home"});
});

const server = http.Server(app);
const io = socketIo(server);

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});