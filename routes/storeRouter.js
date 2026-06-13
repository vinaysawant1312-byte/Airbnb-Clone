const express = require("express");
const path = require("path");
const getControllers = require("../controllers/storecontroller");

const rootDir = require("../utils/pathUtils");
const storeRouter = express.Router();

storeRouter.get("/", getControllers.getIndex);
storeRouter.get("/homes", getControllers.getHome);
storeRouter.get("/bookings", getControllers.getBookings);
storeRouter.get("/index", getControllers.getIndex);
storeRouter.get("/favourites", getControllers.getFavouraiteList);
storeRouter.get("/homes/:homeId", getControllers.getHomeDetails);
storeRouter.post("/favourites", getControllers.postAddToFavoraite);

module.exports = storeRouter;
