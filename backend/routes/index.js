const express = require("express");
const create = require("../controllers/createContract.js");
const buy = require("../controllers/buyTicket.js");
const router = express.Router();
const events = express.Router();
const jsonParser = express.json();
 
//router.get("/showBalance", create.viewBalance);
router.post("/createTicket", jsonParser, create.createTicket);


events.get("/:eventId/", create.showEvent)
events.post("/:eventId/buyTicket", buy.buyTicket)
events.get("/", create.showAll)

 
module.exports = {router: router, events: events};