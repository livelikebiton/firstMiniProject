global.config = require("./config.json");
const express = require("express");
const cors = require("cors");

const developerController = require("./controllers-layer/developer-controller");
const server = express ();

server.use(cors());
server.use(express.json());
server.use("/api",developerController);


server.listen(3001, () => console.log("Listening.."));