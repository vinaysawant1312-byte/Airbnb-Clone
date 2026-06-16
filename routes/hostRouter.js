const express = require("express");
const path = require("path");

const getControllers = require("../controllers/hostController");
const rootDir = require("../utils/pathUtils");
const hostRouter = express.Router();

hostRouter.get("/add-home", getControllers.getAddHome);

hostRouter.post("/add-home", getControllers.postAddHome);
hostRouter.get("/host-home-list", getControllers.getHostHome);
hostRouter.get("/edit-home/:homeId", getControllers.getEditHome);
hostRouter.post("/edit-home", getControllers.postEditHome);

module.exports = hostRouter;
