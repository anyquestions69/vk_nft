const express = require("express");
const create = require("../controllers/createContract.js");
const buy = require("../controllers/buyTicket.js");
const router = express.Router();
const jsonParser = express.json();
 
router.post("/createTicket", jsonParser, create.createTicket);
router.use("/buyTicket", (req,res)=>{});
router.get("/showBalance", create.viewBalance);
 
module.exports = router;