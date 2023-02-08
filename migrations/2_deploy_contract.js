var ticketCreator = artifacts.require("ticketCreator");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ticketCreator);
};