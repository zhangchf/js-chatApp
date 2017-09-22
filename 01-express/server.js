"use strict";

var http = require("http");
var express = require("express");

const app = express();

app.get("/", (request, response) => {
    response.end("Hello World!");
});

const server = http.Server(app);

const port = 3000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});