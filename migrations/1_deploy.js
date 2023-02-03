var MyContract = artifacts.require("ticketCreator");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};