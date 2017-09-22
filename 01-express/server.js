"use strict";

var http = require("http");
var express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.use((request, response, next) => {
    console.log("In middleware 1");
    response.write("HEADER\n");
    next();
    console.log("Out of middleware 1");
});


app.use((request, response, next) => {
    console.log("In middleware 2");
    response.write("Header 2\n");
    next();
    console.log("Out of middleware 2、\n");
});

app.get("/", (request, response) => {
    console.log("In handler");
    response.end("Hello World!");
});

const server = http.Server(app);

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});